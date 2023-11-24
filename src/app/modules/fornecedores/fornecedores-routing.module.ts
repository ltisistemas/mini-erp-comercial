import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresComponent } from './domain/presentation/fornecedores.component';

export const routes: Routes = [
  {
    path: '',
    component: FornecedoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FornecedoresRoutingModule {}
