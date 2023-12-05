import { Injectable } from "@angular/core";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { Produto } from "../entities/produto";
import { ProdutoError, ProdutoNotFound } from "../error/produto-error";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ProdutosService {
  constructor(
    private api: FirebaseService,
    private usuarioService: UsuarioLogadoUsecaseService
  ) {}

  async listar(): Promise<Produto[] | ProdutoError> {
    const usuario = this.usuarioService.buscarUsuarioLogado();

    const snapshot = await this.api.getSnapshot({
      table: environment.tabelas.produtos,
      campo: "empresa_id",
      valor: usuario.empresa_id,
    });

    if (snapshot) {
      return snapshot.docs.map((doc) => {
        const data = doc.data() as Produto;

        return {
          uid: doc.id,
          nome: data.nome,
          descricao: data.descricao,
          codigo_barras: data.codigo_barras,
          qr_code: data.qr_code,
          categoria_id: data.categoria_id,
          sub_categoria_id: data.sub_categoria_id,
          caracteristicas: data.caracteristicas,
        } as Produto;
      });
    }

    return new ProdutoNotFound();
  }
}
