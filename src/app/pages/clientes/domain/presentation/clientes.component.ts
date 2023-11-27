import { Component, OnInit } from '@angular/core';
import { ClienteControllerService } from '../controllers/cliente-controller.service';
import { Cliente } from '../entities/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private controller: ClienteControllerService) {}

  ngOnInit() {
    this.controller.init(this);
  }

  adicionar = () => this.controller.adicionar();

  editar = (cliente: Cliente) => this.controller.editar(cliente);

  status = (cliente: Cliente) => this.controller.status(cliente);
}
