import { Injectable } from "@angular/core";
import { ProdutosService } from "../services/produtos.service";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria";
import { CategoriaFormularioInvalido } from "../error/categoria-error";
import { SubCategoriasService } from "../services/sub-categorias.service";
import { SubCategoria } from "../entities/sub-categoria";

@Injectable({ providedIn: "root" })
export class EditarSubCategoriaService {
  constructor(private service: SubCategoriasService) {}

  async editar(subCategoria: SubCategoria) {
    const formValido = this.validarForm(subCategoria.descricao);
    if (formValido instanceof CategoriaFormularioInvalido) return formValido;

    return this.service.editar(subCategoria);
  }

  private validarForm(nome: string): boolean | CategoriaFormularioInvalido {
    if (nome === "") {
      return new CategoriaFormularioInvalido("Preencha o campo Descrição");
    }

    return true;
  }
}
