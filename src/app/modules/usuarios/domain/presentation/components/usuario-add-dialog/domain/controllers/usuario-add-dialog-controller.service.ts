import { Injectable } from '@angular/core';
import { UsuarioAddDialogComponent } from '../presentation/usuario-add-dialog.component';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as bcrypt from 'bcryptjs';

@Injectable({ providedIn: 'root' })
export class UsuarioAddDialogControllerService {
  constructor(private service: FirebaseService, private _snack: MatSnackBar) {}

  init(component: UsuarioAddDialogComponent) {
    if (component.data && component.data.usuario) {
      const { usuario } = component.data;

      const { form } = component;

      form.get('nome')?.setValue(usuario.nome);
      form.get('email')?.setValue(usuario.email);
    }
  }
  async handdle(component: UsuarioAddDialogComponent) {
    const { nome, email, password } = component.form.value;
    const formValidado = this.validarForm(component, nome, email, password);
    if (formValidado) {
      try {
        const usuarioExiste = await this.service.getSnapshot({
          table: 'usuario',
          campo: 'email',
          valor: email,
        });

        if (usuarioExiste) {
          const message = 'Este e-mail já esta cadastrado para outro usuário';
          this._snack.open(message, '', { duration: 3500 });
          component.processando = false;
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const usuario = this.service.getUsuarioLogado();
        const request = {
          cliente_id: usuario?.cliente_id,
          nome: nome,
          email: email,
          password: passwordHash,
          google_id: '',
          status: 'ATIVO',
        };

        await this.service.addDOcument('usuario', request);

        const message = 'Usuário incluido com sucesso';
        this._snack.open(message, '', { duration: 3500 });
        component.processando = false;
        component.dialogRef.close();
      } catch (error) {
        const message = '[USR003]: Houve um erro ao tentar salvar o registro';
        this._snack.open(message, '', { duration: 3500 });
        component.processando = false;
        return;
      }
    }
  }

  private validarForm(
    component: UsuarioAddDialogComponent,
    nome: string,
    email: string,
    password: string
  ) {
    if (nome === '') {
      const message = 'Campo nome precisa estar preenchido';
      this._snack.open(message, '', { duration: 3500 });
      return false;
    }
    if (email === '') {
      const message = 'Campo e-mail precisa estar preenchido';
      this._snack.open(message, '', { duration: 3500 });
      return false;
    }

    if (password === '' && component.data && !component.data.usuario) {
      const message = 'Campo senha precisa estar preenchido';
      this._snack.open(message, '', { duration: 3500 });
      return false;
    }

    return true;
  }
}
