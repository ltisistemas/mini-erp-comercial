import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { LoginComponent } from '../presentation/login.component';
import { UsuarioLogado } from '../entities/usuario-logado';
import { environment } from 'src/environments/environment';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GeneralUserControllerService } from './general-user-controller.service';

@Injectable({ providedIn: 'root' })
export class LoginGoogleControllerService {
  constructor(
    private _snack: MatSnackBar,
    private service: FirebaseService,
    private router: Router,
    private general: GeneralUserControllerService
  ) {}

  loginWithGoogle(component: LoginComponent) {
    component.processando = true;
    this.service
      .loginWithGoogle()
      .then(async (response: any) => {
        const { user } = response;

        const { accessToken, email, displayName, uid } = user;

        const usuario = await this.service.findById('usuario', uid);

        if (usuario.exists()) {
          const usuarioLogado = this.general.loadUsuarioLogado(
            usuario,
            uid,
            email
          );
          this.general.setStore(usuarioLogado, accessToken);
          return this.router.navigateByUrl('');
        }

        const db = this.service.db;
        const data = {
          email,
          google_id: uid,
          nome: displayName,
          status: 'ATIVO',
        };

        await setDoc(doc(db, 'usuario', uid), data);

        const docRef = doc(db, 'usuario', uid);

        const usuarioRef = await getDoc(docRef);

        const usuarioLogado = this.general.loadUsuarioLogado(
          usuarioRef,
          uid,
          email
        );

        this.general.setStore(usuarioLogado, accessToken);

        component.processando = false;

        return this.router.navigateByUrl('');
      })
      .catch((err) => {
        console.log('> Error Firebase', err);
        component.processando = false;
        this._snack.open(
          'Usuário/Senha incorretos. Tente novamente',
          'Dispensar'
        );
      });
  }
}
