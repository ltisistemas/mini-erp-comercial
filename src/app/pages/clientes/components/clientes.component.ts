import { Component, Inject, OnInit } from "@angular/core";
import { Cliente } from "../entities/cliente";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ListarClientesService } from "../use-cases/listar-clientes.service";
import {
  ClienteError,
  ClienteFormularioInvalido,
  ClienteNotFound,
} from "../errors/cliente-error";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PesquisarCepService } from "../use-cases/pesquisar-cep.service";
import { CepError } from "../errors/cep-error";
import { IncluirClienteService } from "../use-cases/incluir-cliente.service";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";

interface DialogData {
  cliente?: Cliente;
}

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  datasource = new MatTableDataSource<Cliente>();
  displayedColumns = ["nome", "email", "telefone", "bairro"];

  processando = false;
  panelOpenState = false;
  form: FormGroup;
  usuarioLogado: UsuarioLogado = this.getUsuario.buscarUsuarioLogado();

  constructor(
    private listarService: ListarClientesService,
    private incluirService: IncluirClienteService,
    private getUsuario: UsuarioLogadoUsecaseService,
    private cepService: PesquisarCepService,
    public dialogRef: MatDialogRef<ClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required]],
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
    this.loadData();
  }

  private async loadData() {
    const clientes = await this.listarService.listar();

    if (clientes instanceof ClienteNotFound) {
      this.clientes = [];
      return this.populateDatasource();
    }

    this.clientes = clientes;
    return this.populateDatasource();
  }

  private populateDatasource() {
    this.datasource.data = this.clientes;
  }

  onNoClick = () => this.dialogRef.close();
  async onHanddle() {
    if (this.processando) return;
    this.processando = true;

    const cliente = new Cliente({
      uid: "",
      empresa_id: this.usuarioLogado.empresa_id,
      nome: this.form.get("nome")?.value,
      cpf_cnpj: this.form.get("cpf_cnpj")?.value,
      email: this.form.get("email")?.value,
      telefone: this.form.get("telefone")?.value,
      cep: this.form.get("cep")?.value,
      logradouro: this.form.get("logradouro")?.value,
      numero: this.form.get("numero")?.value,
      complemento: this.form.get("complemento")?.value,
      bairro: this.form.get("bairro")?.value,
      cidade: this.form.get("cidade")?.value,
      estado: this.form.get("estado")?.value,
      estado_uf: this.form.get("estado_uf")?.value,
    });

    const response = await this.incluirService.incluir(cliente);

    if (response instanceof ClienteError) {
      this.snack.open(response.message, "", { duration: 2500 });
      return;
    }

    const message = "Cliente cadastrado com sucesso!";
    this.snack.open(message, "", { duration: 2500 });
    this.panelOpenState = false;
    this.loadData();
  }

  adicionar = () => {};

  editar = (cliente: Cliente) => {
    // this.controller.editar(cliente);
  };

  status = (cliente: Cliente) => {
    // this.controller.status(cliente);
  };

  clearForm() {
    this.form.reset();
  }

  pesquisarCep = async () => {
    if (this.processando) return;
    this.processando = true;

    const cep = await this.cepService.pesquisarCEP(this.form.get("cep")?.value);
    if (cep instanceof CepError) {
      this.processando = false;

      const message = cep.message;
      this.snack.open(message, "", { duration: 3500 });

      return;
    }
    this.form.get("logradouro")?.setValue(cep.logradouro);
    this.form.get("bairro")?.setValue(cep.bairro);
    this.form.get("cidade")?.setValue(cep.cidade);
    this.form.get("estado")?.setValue(cep.estado.descricao);
    this.form.get("estado_uf")?.setValue(cep.estado.sigla);
    this.processando = false;
  };
}
