import { Injectable } from "@angular/core";
import { ProdutosService } from "../services/produtos.service";
import { ProdutoError, ProdutoNotFound } from "../error/produto-error";
import { Produto } from "../entities/produto";

@Injectable({ providedIn: "root" })
export class ListarProdutosService {
  constructor(private service: ProdutosService) {}

  async listar(): Promise<Produto[]> {
    const lista = await this.service.listar();
    if (lista instanceof ProdutoError) return [];

    return lista;
  }
}
