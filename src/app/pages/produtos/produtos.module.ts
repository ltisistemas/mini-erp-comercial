import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProdutosComponent } from "./components/produto/produtos.component";
import { ProdutosService } from "./services/produtos.service";
import { ListarProdutosService } from "./use-cases/listar-produtos.service";
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { ListarCategoriasService } from "./use-cases/listar-categorias.service";
import { CategoriaService } from "./services/categoria.service";
import { IncluirCategoriaService } from "./use-cases/incluir-categoria.service";
import { SubCategoriaComponent } from "./components/sub-categoria/sub-categoria.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProdutosComponent, CategoriasComponent, SubCategoriaComponent],
  providers: [
    ProdutosService,
    ListarProdutosService,
    ListarCategoriasService,
    CategoriaService,
    IncluirCategoriaService,
  ],
})
export class ProdutosModule {}
