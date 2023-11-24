import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import cepPromise from 'cep-promise';
import { estados } from 'src/app/modules/fornecedores/domain/entities/estados';
import { FornecedorDialogComponent } from '../presentation/fornecedor-dialog.component';

@Injectable({ providedIn: 'root' })
export class FornecedorDialogControllerService {
  constructor(private service: FirebaseService, private snack: MatSnackBar) {}

  init(component: FornecedorDialogComponent) {
    if (component.data && component.data.fornecedor) {
      const { fornecedor } = component.data;

      const { form } = component;

      form.get('logradouro')?.disable();
      form.get('bairro')?.disable();
      form.get('cidade')?.disable();
      form.get('estado')?.disable();
      form.get('estado_uf')?.disable();

      if (fornecedor) {
        form.get('razao_social')?.setValue(fornecedor.razao_social);
        form.get('nome_fantasia')?.setValue(fornecedor.nome_fantasia);
        form.get('cpf_cnpj')?.setValue(fornecedor.cpf_cnpj);
        form.get('email')?.setValue(fornecedor.email);
        form.get('telefone')?.setValue(fornecedor.telefone);
        form.get('cep')?.setValue(fornecedor.cep);
        form.get('logradouro')?.setValue(fornecedor.logradouro);
        form.get('numero')?.setValue(fornecedor.numero);
        form.get('complemento')?.setValue(fornecedor.complemento);
        form.get('bairro')?.setValue(fornecedor.bairro);
        form.get('cidade')?.setValue(fornecedor.cidade);
        form.get('estado')?.setValue(fornecedor.estado);
        form.get('estado_uf')?.setValue(fornecedor.estado_uf);
        form.get('status')?.setValue(fornecedor.status);
      }
    }
  }

  async handdle(component: FornecedorDialogComponent) {
    if (!component.data.fornecedor) await this.incluir(component);

    if (component.data.fornecedor) await this.atualizar(component);
  }

  private async incluir(component: FornecedorDialogComponent) {
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

      await this.service.addDOcument('fornecedores', request);

      const options = { duration: 2500 };
      this.snack.open('Fornecedor salvo com sucesso!', '', options);

      component.processando = false;
      component.dialogRef.close({ response: true });
    } catch (err) {
      component.processando = false;

      const options = { duration: 2500 };
      this.snack.open('Houve um erro ao tentar salvar', '', options);
    }
  }

  private async atualizar(component: FornecedorDialogComponent) {
    try {
      if (component.processando) return;
      component.processando = true;

      const { form } = component;
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
        status: component.data.fornecedor?.status,
      };

      const { uid } = component.data.fornecedor!;

      await this.service.updateDOcument('fornecedores', uid, request);

      const options = { duration: 2500 };
      this.snack.open('Fornecedor salvo com sucesso!', '', options);

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

  async pesquisarCep(component: FornecedorDialogComponent) {
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
