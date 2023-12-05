import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProdutosComponent } from "./components/produto/produtos.component";
import { ProdutosService } from "./services/produtos.service";
import { ListarProdutosService } from "./use-cases/listar-produtos.service";
import { CategoriasComponent } from "./components/categorias/categorias.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProdutosComponent, CategoriasComponent],
  providers: [ProdutosService, ListarProdutosService],
})
export class ProdutosModule {}
