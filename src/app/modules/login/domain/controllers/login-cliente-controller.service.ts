import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { GeneralUserControllerService } from './general-user-controller.service';
import { LoginComponent } from '../presentation/login.component';
import { UsuarioLogado } from '../entities/usuario-logado';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginClienteControllerService {
  constructor(
    private _snack: MatSnackBar,
    private fireService: FirebaseService,
    private router: Router,
    private general: GeneralUserControllerService
  ) {}

  async login(component: LoginComponent) {
    try {
      const { email, password } = component.credentials.value;
      if (!this.validarFormulario(email, password)) return;

      component.processando = true;
      const userFromDb = await this.loadUserFromDb(component, email, password);
      if (!userFromDb) return;

      const { doc, data } = userFromDb;
      const usuarioLogado = this.general.loadUsuarioLogado(data, doc.id, email);

      const accessToken = this.general.generateJWT(
        usuarioLogado.id,
        usuarioLogado.nome,
        usuarioLogado.email
      );

      this.general.setStore(usuarioLogado, accessToken);

      component.processando = false;
      this.router.navigateByUrl('');
    } catch (error) {
      const message = '[USR003]: Houve um erro ao tentar realizar o Login!';
      this._snack.open(message, '', { duration: 3500 });
      component.processando = false;
      return;
    }
  }

  private validarFormulario(email: string, password: string) {
    if (email === '') {
      this._snack.open('Preencha o campo e-mail', 'Dispensar');
      return false;
    }

    if (password === '') {
      this._snack.open('Preencha o campo senha', 'Dispensar');
      return false;
    }
    return true;
  }

  private async loadUserFromDb(
    component: LoginComponent,
    email: string,
    password: string
  ) {
    const userDB = await this.fireService.getSnapshot({
      table: environment.tabelas.usuario,
      campo: 'email',
      valor: email,
    });

    if (!userDB) {
      const message = '[USR001]: Usuário não encontrado';
      this._snack.open(message, '', { duration: 3500 });
      component.processando = false;
      return null;
    }

    const doc = userDB.docs[0];
    const data = doc.data() as UsuarioLogado;
    const compare = bcrypt.compareSync(password, data.password!);
    if (!compare) {
      const message = '[USR002]: Usuário / Senha não encontrado';
      this._snack.open(message, '', { duration: 3500 });
      component.processando = false;
      return null;
    }

    return { doc, data };
  }
}
