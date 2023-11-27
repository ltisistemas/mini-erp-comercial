import { Component, OnInit } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuariosControllerService } from '../controllers/usuarios-controllers.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private controller: UsuariosControllerService) {}

  ngOnInit() {
    this.controller.init(this);
  }

  addUsuario = () => this.controller.addUsuario();

  editarUsuario = (usuario: Usuario) => this.controller.editarUsuario(usuario);

  statusAtivo(status: 'ATIVO' | 'INATIVO') {
    return status === 'ATIVO';
  }
  statusInativo(status: 'ATIVO' | 'INATIVO') {
    return status === 'INATIVO';
  }
  status = (usuario: Usuario) => this.controller.status(usuario);
}
