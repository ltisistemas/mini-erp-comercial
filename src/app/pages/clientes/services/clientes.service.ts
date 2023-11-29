import { Injectable } from "@angular/core";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { environment } from "src/environments/environment";
import { ClienteNotFound } from "../errors/cliente-error";
import { Cliente } from "../entities/cliente";

@Injectable({ providedIn: "root" })
export class ClienteService {
  constructor(
    private api: FirebaseService,
    private usuarioLogadoService: UsuarioLogadoUsecaseService
  ) {}

  async listar(): Promise<Cliente[] | ClienteNotFound> {
    const usuario = this.usuarioLogadoService.buscarUsuarioLogado();

    const snapshot = await this.api.getSnapshot({
      table: environment.tabelas.clientes,
      campo: "cliente_id",
      valor: usuario.cliente_id!,
    });

    if (snapshot) {
      const clientes: Cliente[] = [];

      for (const doc of snapshot.docs) {
        const data = doc.data() as Cliente;
        const cliente = new Cliente({
          uid: doc.id,
          nome: data.nome,
          cpf_cnpj: data.cpf_cnpj,
          email: data.email,
          telefone: data.telefone,
          cep: data.cep,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
          estado_uf: data.estado_uf,
          status: data.status,
        });

        clientes.push(cliente);
      }

      return clientes;
    }

    return new ClienteNotFound();
  }
}
