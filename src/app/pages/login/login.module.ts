import { NgModule } from "@angular/core";

import { LoginComponent } from "./components/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginClienteControllerService } from "./domain/controllers/login-cliente-controller.service";
import { LoginControllerService } from "./domain/controllers/login-controller.service";
import { LoginService } from "./services/login.service";

@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [
    LoginService,
    LoginControllerService,
    LoginClienteControllerService,
  ],
})
export class LoginModule {}
