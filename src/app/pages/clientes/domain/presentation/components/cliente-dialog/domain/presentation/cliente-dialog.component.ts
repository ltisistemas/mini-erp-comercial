import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClienteDialogControllerService } from "../controllers/cliente-dialog-controller.service";
import { Cliente } from "src/app/pages/clientes/domain/entities/cliente";

interface DialogData {
  lojaId: string;
  cliente?: Cliente;
}

@Component({
  selector: "app-cliente-dialog",
  templateUrl: "./cliente-dialog.component.html",
  styleUrls: ["./cliente-dialog.component.scss"],
})
export class ClienteDialogComponent implements OnInit {
  form: FormGroup;
  processando = false;

  get title() {
    return this.data.cliente ? "Edite um cliente" : "Adicione um cliente";
  }

  constructor(
    private controller: ClienteDialogControllerService,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome_fantasia: ["", [Validators.required]],
      razao_social: ["", []],
      cpf_cnpj: ["", []],
      email: ["", []],
      telefone: ["", []],
      cep: ["", []],
      logradouro: { value: "", disabled: true },
      numero: ["", []],
      complemento: ["", []],
      bairro: { value: "", disabled: true },
      cidade: { value: "", disabled: true },
      estado: { value: "", disabled: true },
      estado_uf: { value: "", disabled: true },
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
