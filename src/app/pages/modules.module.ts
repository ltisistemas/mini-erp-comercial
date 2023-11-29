import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { ShareModule } from "./share/share.module";
import { ClientesModule } from "./clientes/clientes.module";

@NgModule({
  imports: [LoginModule, HomeModule, ShareModule, ClientesModule],
})
export class ModulesModule {}
