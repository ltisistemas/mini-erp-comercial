import { Injectable } from "@angular/core";
import { CategoriaError } from "../error/categoria-error";
import { Categoria } from "../entities/categoria";
import { CategoriaService } from "../services/categoria.service";

@Injectable({ providedIn: "root" })
export class ListarCategoriasService {
  constructor(private service: CategoriaService) {}

  async listar(): Promise<Categoria[]> {
    const lista = await this.service.listar();
    if (lista instanceof CategoriaError) return [];

    return lista;
  }
}
