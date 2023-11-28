import { Injectable } from "@angular/core";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";
import { FirebaseService } from "src/app/shared/utils/firebase.service";

@Injectable({ providedIn: "root" })
export class HomeService {
  constructor(private api: FirebaseService) {}

  buscarUsuarioLogado() {
    const usuario = this.api.getUsuarioLogado()! as UsuarioLogado;

    return usuario;
  }
}
