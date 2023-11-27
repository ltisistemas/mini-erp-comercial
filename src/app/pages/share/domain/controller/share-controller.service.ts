import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { ShareComponent } from '../presentation/share.component';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ShareControllerService {
  constructor(
    private _snack: MatSnackBar,
    private service: FirebaseService,
    private router: Router
  ) {}

  async init(component: ShareComponent) {
    component.processando = true;

    const db = this.service.db;

    const conta = await getDoc(doc(db, 'lista-de-compras', component.listaId!));
    if (conta.exists()) component.listaAtualNome = (conta.data() as any).nome;

    const usuario = await getDoc(doc(db, 'usuario', component.usuarioId!));
    if (usuario.exists())
      component.usuarioEnvioNome = (usuario.data() as any).nome;

    // Incluir lista a lista do usuario
    const usuarioLgoado = this.service.getUsuarioLogado();

    const q = query(
      collection(db, 'associacao-lista-usuario'),
      where('usuario_id', '==', usuarioLgoado!.id),
      where('lista_id', '==', component.listaId!)
    );

    const querySnapshot = await getDocs(q);
    console.log('> Size', querySnapshot.size);
    if (querySnapshot.size <= 0) {
      await addDoc(collection(db, 'associacao-lista-usuario'), {
        lista_id: component.listaId!,
        usuario_id: usuarioLgoado?.id,
      });
    }

    component.processando = false;
  }

  goLista(component: ShareComponent) {
    this.router.navigateByUrl(`lista?lista_id=${component.listaId}`);
  }
}
