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
import { EditarCategoriaService } from "./use-cases/editar-categoria.service";
import { SubCategoriasService } from "./services/sub-categorias.service";
import { ListarSubCategoriasService } from "./use-cases/listar-sub-categorias.service ";
import { IncluirSubCategoriaService } from "./use-cases/incluir-sub-categoria.service";
import { EditarSubCategoriaService } from "./use-cases/editar-sub-categoria.service";
import { CadastroProdutoComponent } from "./components/cadastro-produto/cadastro-produto.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    ProdutosComponent,
    CategoriasComponent,
    SubCategoriaComponent,
    CadastroProdutoComponent,
  ],
  providers: [
    ProdutosService,
    ListarProdutosService,
    ListarCategoriasService,
    CategoriaService,
    IncluirCategoriaService,
    EditarCategoriaService,
    SubCategoriasService,
    ListarSubCategoriasService,
    IncluirSubCategoriaService,
    EditarSubCategoriaService,
  ],
})
export class ProdutosModule {}
