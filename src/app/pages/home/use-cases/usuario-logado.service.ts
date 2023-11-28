import { Injectable } from "@angular/core";
import { HomeService } from "../services/home.service";

@Injectable({ providedIn: "root" })
export class UsuarioLogadoService {
  constructor(private service: HomeService) {}

  buscarUsuarioLogado() {
    return this.service.buscarUsuarioLogado();
  }
}
