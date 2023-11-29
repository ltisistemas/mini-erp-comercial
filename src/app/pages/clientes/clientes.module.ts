import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ClientesRoutingModule } from "./clientes-routing.module";
import { ClientesComponent } from "./components/clientes.component";
import { ClienteDialogComponent } from "./domain/presentation/components/cliente-dialog/domain/presentation/cliente-dialog.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ClienteService } from "./services/clientes.service";
import { ListarClientesService } from "./use-cases/listar-clientes.service";

@NgModule({
  imports: [CommonModule, SharedModule, ClientesRoutingModule],
  exports: [],
  declarations: [ClientesComponent, ClienteDialogComponent],
  providers: [
    ClienteService,
    ListarClientesService,
    // ClienteControllerService,
    // ClienteDialogControllerService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientesModule {}
