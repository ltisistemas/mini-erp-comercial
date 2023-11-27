import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteControllerService } from './domain/controllers/cliente-controller.service';
import { ClientesComponent } from './domain/presentation/clientes.component';
import { ClienteDialogControllerService } from './domain/presentation/components/cliente-dialog/domain/controllers/cliente-dialog-controller.service';
import { ClienteDialogComponent } from './domain/presentation/components/cliente-dialog/domain/presentation/cliente-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ClientesRoutingModule],
  exports: [],
  declarations: [ClientesComponent, ClienteDialogComponent],
  providers: [ClienteControllerService, ClienteDialogControllerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientesModule {}
