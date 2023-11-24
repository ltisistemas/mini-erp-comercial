import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FornecedorDialogControllerService } from '../controllers/fornecedor-dialog-controller.service';
import { Fornecedor } from 'src/app/modules/fornecedores/domain/entities/fornecedor';

interface DialogData {
  lojaId: string;
  fornecedor?: Fornecedor;
}

@Component({
  selector: 'app-fornecedor-dialog',
  templateUrl: './fornecedor-dialog.component.html',
  styleUrls: ['./fornecedor-dialog.component.scss'],
})
export class FornecedorDialogComponent implements OnInit {
  form: FormGroup;
  processando = false;

  get title() {
    return this.data.fornecedor ? 'Edite um cliente' : 'Adicione um cliente';
  }

  constructor(
    private controller: FornecedorDialogControllerService,
    public dialogRef: MatDialogRef<FornecedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome_fantasia: ['', [Validators.required]],
      razao_social: ['', []],
      cpf_cnpj: ['', []],
      email: ['', []],
      telefone: ['', []],
      cep: ['', []],
      logradouro: { value: '', disabled: true },
      numero: ['', []],
      complemento: ['', []],
      bairro: { value: '', disabled: true },
      cidade: { value: '', disabled: true },
      estado: { value: '', disabled: true },
      estado_uf: { value: '', disabled: true },
    });
  }

  ngOnInit() {
    this.controller.init(this);
  }

  onNoClick(): void {
    this.dialogRef.close({ response: false, data: {} });
  }

  handdle = () => this.controller.handdle(this);
  pesquisarCep = () => this.controller.pesquisarCep(this);
}
