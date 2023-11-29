import { Component, Inject, OnInit } from "@angular/core";
import { Cliente } from "../entities/cliente";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ListarClientesService } from "../use-cases/listar-clientes.service";
import { ClienteNotFound } from "../errors/cliente-error";

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

  constructor(
    private listarService: ListarClientesService,
    public dialogRef: MatDialogRef<ClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

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
  onHanddle() {}

  adicionar = () => {
    // this.controller.adicionar();
  };

  editar = (cliente: Cliente) => {
    // this.controller.editar(cliente);
  };

  status = (cliente: Cliente) => {
    // this.controller.status(cliente);
  };
}
