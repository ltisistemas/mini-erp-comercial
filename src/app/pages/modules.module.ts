import { NgModule } from "@angular/core";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { ShareModule } from "./share/share.module";
import { ClientesModule } from "./clientes/clientes.module";
import { FornecedoresModule } from "./fornecedores/fornecedores.module";

@NgModule({
  imports: [
    LoginModule,
    HomeModule,
    UsuariosModule,
    ShareModule,
    ClientesModule,
    FornecedoresModule,
  ],
})
export class ModulesModule {}
