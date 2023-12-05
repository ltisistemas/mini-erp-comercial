import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { ShareModule } from "./share/share.module";
import { ClientesModule } from "./clientes/clientes.module";
import { ProdutosModule } from "./produtos/produtos.module";

@NgModule({
  imports: [
    LoginModule,
    HomeModule,
    ShareModule,
    ClientesModule,
    ProdutosModule,
  ],
})
export class ModulesModule {}
