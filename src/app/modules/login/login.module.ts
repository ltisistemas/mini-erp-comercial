import { NgModule } from "@angular/core";

import { LoginComponent } from "./domain/presentation/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginClienteControllerService } from "./domain/controllers/login-cliente-controller.service";
import { LoginControllerService } from "./domain/controllers/login-controller.service";

@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [LoginControllerService, LoginClienteControllerService],
})
export class LoginModule {}
