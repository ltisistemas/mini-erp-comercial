import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './domain/presentation/usuarios.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
