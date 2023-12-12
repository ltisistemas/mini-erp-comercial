import { Injectable } from "@angular/core";
import { CategoriaFormularioInvalido } from "../error/categoria-error";
import { SubCategoria } from "../entities/sub-categoria";
import { SubCategoriasService } from "../services/sub-categorias.service";

@Injectable({ providedIn: "root" })
export class IncluirSubCategoriaService {
  constructor(private service: SubCategoriasService) {}

  async incluir(subCategoria: SubCategoria) {
    const formValido = this.validarForm(subCategoria.descricao);
    if (formValido instanceof CategoriaFormularioInvalido) return formValido;

    return this.service.incluir(subCategoria);
  }

  private validarForm(nome: string): boolean | CategoriaFormularioInvalido {
    if (nome === "") {
      return new CategoriaFormularioInvalido("Preencha o campo Descrição");
    }

    return true;
  }
}
