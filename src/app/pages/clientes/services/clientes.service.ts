import { Injectable } from "@angular/core";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { environment } from "src/environments/environment";
import { ClienteError, ClienteNotFound } from "../errors/cliente-error";
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
      campo: "empresa_id",
      valor: usuario.empresa_id,
    });

    if (snapshot) {
      const clientes: Cliente[] = [];

      for (const doc of snapshot.docs) {
        const data = doc.data() as Cliente;
        const cliente = new Cliente({
          uid: doc.id,
          empresa_id: data.empresa_id,
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

  async incluir(cliente: Cliente): Promise<boolean | ClienteError> {
    try {
      const request = {
        empresa_id: cliente.empresa_id,
        nome: cliente.nome,
        cpf_cnpj: cliente.cpf_cnpj,
        email: cliente.email,
        telefone: cliente.telefone,
        cep: cliente.cep,
        logradouro: cliente.logradouro,
        numero: cliente.numero,
        complemento: cliente.complemento,
        bairro: cliente.bairro,
        cidade: cliente.cidade,
        estado: cliente.estado,
        estado_uf: cliente.estado_uf,
        status: "ATIVO",
      };

      await this.api.addDOcument(environment.tabelas.clientes, request);

      return true;
    } catch (err) {
      return new ClienteError("Houve um erro ao tentar salvar");
    }
  }
}
