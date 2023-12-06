import { Injectable } from "@angular/core";
import { ProdutosService } from "../services/produtos.service";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria";
import { CategoriaFormularioInvalido } from "../error/categoria-error";

@Injectable({ providedIn: "root" })
export class IncluirCategoriaService {
  constructor(private service: CategoriaService) {}

  async incluir(categoria: Categoria) {
    const formValido = this.validarForm(categoria.descricao);
    if (formValido instanceof CategoriaFormularioInvalido) return formValido;

    return this.service.incluir(categoria);
  }

  private validarForm(nome: string): boolean | CategoriaFormularioInvalido {
    if (nome === "") {
      return new CategoriaFormularioInvalido("Preencha o campo Descrição");
    }

    return true;
  }
}
