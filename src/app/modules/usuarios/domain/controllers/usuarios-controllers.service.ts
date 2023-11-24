import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { UsuariosComponent } from '../presentation/usuarios.component';
import {
  collection,
  onSnapshot,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { Usuario } from '../entities/usuario';
import { UsuarioAddDialogComponent } from '../presentation/components/usuario-add-dialog/domain/presentation/usuario-add-dialog.component';

@Injectable({ providedIn: 'root' })
export class UsuariosControllerService {
  private _tableName = 'usuario';

  constructor(private service: FirebaseService, private dialog: MatDialog) {}

  init(component: UsuariosComponent) {
    const usuarioLogado = this.service.getUsuarioLogado();

    const db = this.service.db;

    const ref = collection(db, this._tableName);
    const q = query(ref, where('cliente_id', '==', usuarioLogado?.cliente_id));

    onSnapshot(q, (querySnapshot) => {
      const usuarios: Usuario[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== usuarioLogado?.id) {
          const usuario = new Usuario({
            id: doc.id,
            cliente_id: (doc.data() as any).cliente_id,
            profile: (doc.data() as any).profile,
            google_id: (doc.data() as any).google_id,
            nome: (doc.data() as any).nome,
            email: (doc.data() as any).email,
            status: (doc.data() as any).status,
          });
          usuarios.push(usuario);
        }
      });

      component.usuarios = usuarios;
    });
  }

  addUsuario() {
    this.dialog.open(UsuarioAddDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      disableClose: true,
      hasBackdrop: true,
    });
  }

  editarUsuario(usuario: Usuario) {
    this.dialog.open(UsuarioAddDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      disableClose: true,
      hasBackdrop: true,
      data: { usuario },
    });
  }

  async status(usuario: Usuario) {
    const db = this.service.db;

    const batch = writeBatch(db);

    const ref = this.service.getDoc(this._tableName, usuario.id);

    const status = usuario.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';

    const request = { status };

    batch.update(ref, request);

    await batch.commit();
  }
}
