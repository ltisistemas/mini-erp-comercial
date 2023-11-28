import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home.component";
import { ClientesModule } from "../clientes/clientes.module";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { FornecedoresModule } from "../fornecedores/fornecedores.module";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
        // loadChildren: () => CotacoesModule,
      },
      {
        path: "clientes",
        pathMatch: "full",
        loadChildren: () => ClientesModule,
      },
      {
        path: "fornecedores",
        pathMatch: "full",
        loadChildren: () => FornecedoresModule,
      },
      {
        path: "usuarios",
        pathMatch: "full",
        loadChildren: () => UsuariosModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class HomeRoutingModule {}
