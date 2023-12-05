import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ClientesRoutingModule } from "./clientes-routing.module";
import { ClientesComponent } from "./components/clientes.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ClienteService } from "./services/clientes.service";
import { ListarClientesService } from "./use-cases/listar-clientes.service";
import { PesquisarCepService } from "./use-cases/pesquisar-cep.service";
import { CepService } from "./services/cep.service";
import { IncluirClienteService } from "./use-cases/incluir-cliente.service";

@NgModule({
  imports: [CommonModule, SharedModule, ClientesRoutingModule],
  exports: [],
  declarations: [ClientesComponent],
  providers: [
    ClienteService,
    ListarClientesService,
    PesquisarCepService,
    CepService,
    IncluirClienteService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientesModule {}
