import { Injectable } from "@angular/core";
import { UsuarioLogado } from "../entities/usuario-logado";
import { FirebaseService } from "../utils/firebase.service";

@Injectable({ providedIn: "root" })
export class UsuarioLogadoService {
  constructor(private api: FirebaseService) {}

  buscarUsuarioLogado() {
    const usuario = this.api.getUsuarioLogado()! as UsuarioLogado;

    return usuario;
  }
}
