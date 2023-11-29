import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./components/clientes.component";

export const routes: Routes = [
  {
    path: "",
    component: ClientesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
