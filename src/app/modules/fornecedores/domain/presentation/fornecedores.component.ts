import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../entities/fornecedor';
import { FornecedoresControllerService } from '../controllers/fornecedores-controller.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];

  constructor(private controller: FornecedoresControllerService) {}

  ngOnInit() {
    this.controller.init(this);
  }

  adicionar = () => this.controller.adicionar();

  editar = (fornecedor: Fornecedor) => this.controller.editar(fornecedor);

  status = (fornecedor: Fornecedor) => this.controller.status(fornecedor);
}
