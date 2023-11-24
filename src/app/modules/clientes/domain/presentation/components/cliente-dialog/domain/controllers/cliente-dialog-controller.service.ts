import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { ClienteDialogComponent } from '../presentation/cliente-dialog.component';
import cepPromise from 'cep-promise';
import { estados } from 'src/app/modules/clientes/domain/entities/estados';

@Injectable({ providedIn: 'root' })
export class ClienteDialogControllerService {
  constructor(private service: FirebaseService, private snack: MatSnackBar) {}

  init(component: ClienteDialogComponent) {
    if (component.data && component.data.cliente) {
      const { cliente } = component.data;

      const { form } = component;

      form.get('logradouro')?.disable();
      form.get('bairro')?.disable();
      form.get('cidade')?.disable();
      form.get('estado')?.disable();
      form.get('estado_uf')?.disable();

      if (cliente) {
        form.get('razao_social')?.setValue(cliente.razao_social);
        form.get('nome_fantasia')?.setValue(cliente.nome_fantasia);
        form.get('cpf_cnpj')?.setValue(cliente.cpf_cnpj);
        form.get('email')?.setValue(cliente.email);
        form.get('telefone')?.setValue(cliente.telefone);
        form.get('cep')?.setValue(cliente.cep);
        form.get('logradouro')?.setValue(cliente.logradouro);
        form.get('numero')?.setValue(cliente.numero);
        form.get('complemento')?.setValue(cliente.complemento);
        form.get('bairro')?.setValue(cliente.bairro);
        form.get('cidade')?.setValue(cliente.cidade);
        form.get('estado')?.setValue(cliente.estado);
        form.get('estado_uf')?.setValue(cliente.estado_uf);
        form.get('status')?.setValue(cliente.status);
      }

      // form.get('nome')?.setValue(cliente.nome);
      // form.get('telefone')?.setValue(cliente.telefone);
      // form.get('email')?.setValue(cliente.email);
    }
  }

  async handdle(component: ClienteDialogComponent) {
    if (!component.data.cliente) await this.incluir(component);

    if (component.data.cliente) await this.atualizar(component);
  }

  private async incluir(component: ClienteDialogComponent) {
    try {
      let { form, processando } = component;

      if (processando) return;
      processando = true;

      const { nome } = form.value;

      const formValido = this.validarForm(nome);
      if (!formValido) return;

      const request = {
        nome_fantasia: form.get('nome_fantasia')?.value,
        razao_social: form.get('razao_social')?.value,
        cpf_cnpj: form.get('cpf_cnpj')?.value,
        email: form.get('email')?.value,
        telefone: form.get('telefone')?.value,
        cep: form.get('cep')?.value,
        logradouro: form.get('logradouro')?.value,
        numero: form.get('numero')?.value,
        complemento: form.get('complemento')?.value,
        bairro: form.get('bairro')?.value,
        cidade: form.get('cidade')?.value,
        estado: form.get('estado')?.value,
        estado_uf: form.get('estado_uf')?.value,
        status: 'ATIVO',
      };

      await this.service.addDOcument('clientes', request);

      const options = { duration: 2500 };
      this.snack.open('Cliente salvo com sucesso!', '', options);

      component.processando = false;
      component.dialogRef.close({ response: true });
    } catch (err) {
      component.processando = false;

      const options = { duration: 2500 };
      this.snack.open('Houve um erro ao tentar salvar', '', options);
    }
  }

  private async atualizar(component: ClienteDialogComponent) {
    try {
      if (component.processando) return;
      component.processando = true;

      const { form } = component;
      const { nome } = form.value;

      const formValido = this.validarForm(nome);
      if (!formValido) return;

      const usuario = this.service.getUsuarioLogado();
      const request = {
        nome_fantasia: form.get('nome_fantasia')?.value,
        razao_social: form.get('razao_social')?.value,
        cpf_cnpj: form.get('cpf_cnpj')?.value,
        email: form.get('email')?.value,
        telefone: form.get('telefone')?.value,
        cep: form.get('cep')?.value,
        logradouro: form.get('logradouro')?.value,
        numero: form.get('numero')?.value,
        complemento: form.get('complemento')?.value,
        bairro: form.get('bairro')?.value,
        cidade: form.get('cidade')?.value,
        estado: form.get('estado')?.value,
        estado_uf: form.get('estado_uf')?.value,
        status: component.data.cliente?.status,
      };

      const { uid } = component.data.cliente!;

      await this.service.updateDOcument('clientes', uid, request);

      const options = { duration: 2500 };
      this.snack.open('Cliente salvo com sucesso!', '', options);

      component.processando = false;
      component.dialogRef.close({ response: true });
    } catch (err) {
      console.log(err);
      component.processando = false;

      const options = { duration: 2500 };
      this.snack.open('Houve um erro ao tentar salvar', '', options);
    }
  }

  private validarForm(nome: string) {
    if (nome === '') {
      this.snack.open('Preencha o campo Nome', '', { duration: 2500 });
      return false;
    }

    return true;
  }

  async pesquisarCep(component: ClienteDialogComponent) {
    if (component.form.get('cep')?.value === '') {
      const message = 'Digite um Cep para realizar a pesquisa';
      this.snack.open(message, '', { duration: 3500 });
      return;
    }

    component.processando = true;
    const { cep } = component.form.value;
    const result = await cepPromise(cep);

    const estado = estados.find((e) => e.sigla === result.state);

    component.form.get('logradouro')?.setValue(result.street);
    component.form.get('bairro')?.setValue(result.neighborhood);
    component.form.get('cidade')?.setValue(result.city);
    component.form.get('estado')?.setValue(estado?.descricao);
    component.form.get('estado_uf')?.setValue(result.state);
    component.processando = false;
  }
}
