import { Injectable } from "@angular/core";
import { ClienteService } from "../services/clientes.service";

@Injectable({ providedIn: "root" })
export class ListarClientesService {
  constructor(private service: ClienteService) {}

  async listar() {
    return this.service.listar();
  }
}
