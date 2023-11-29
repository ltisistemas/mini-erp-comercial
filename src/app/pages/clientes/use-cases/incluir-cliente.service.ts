import { Injectable } from "@angular/core";
import { ClienteService } from "../services/clientes.service";
import { ClienteFormularioInvalido } from "../errors/cliente-error";
import { Cliente } from "../entities/cliente";

@Injectable({ providedIn: "root" })
export class IncluirClienteService {
  constructor(private service: ClienteService) {}

  async incluir(cliente: Cliente) {
    const formValido = this.validarForm(cliente.nome);
    if (formValido instanceof ClienteFormularioInvalido) return formValido;

    return this.service.incluir(cliente);
  }

  private validarForm(nome: string): boolean | ClienteFormularioInvalido {
    if (nome === "") {
      return new ClienteFormularioInvalido("Preencha o campo Nome");
    }

    return true;
  }
}
