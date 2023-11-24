import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresControllerService } from './domain/controllers/fornecedores-controller.service';
import { FornecedoresComponent } from './domain/presentation/fornecedores.component';
import { FornecedorDialogControllerService } from './domain/presentation/components/fornecedor-dialog/domain/controllers/fornecedor-dialog-controller.service';
import { FornecedorDialogComponent } from './domain/presentation/components/fornecedor-dialog/domain/presentation/fornecedor-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, FornecedoresRoutingModule],
  exports: [],
  declarations: [FornecedoresComponent, FornecedorDialogComponent],
  providers: [FornecedoresControllerService, FornecedorDialogControllerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FornecedoresModule {}
