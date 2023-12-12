import { Injectable } from "@angular/core";
import { SubCategoriasService } from "../services/sub-categorias.service";
import { SubCategoria } from "../entities/sub-categoria";
import { SubCategoriaError } from "../error/sub-categoria-error";

@Injectable({ providedIn: "root" })
export class ListarSubCategoriasService {
  constructor(private service: SubCategoriasService) {}

  async listar(categoria_id: string): Promise<SubCategoria[]> {
    const lista = await this.service.listar(categoria_id);
    if (lista instanceof SubCategoriaError) return [];

    return lista;
  }
}
