import { Injectable } from "@angular/core";
import { LoginComponent } from "../presentation/login.component";
import { GeneralUserControllerService } from "./general-user-controller.service";
import { TIPO_LOGIN_ENUM } from "../entities/tipo-login-enum";
import { LoginClienteControllerService } from "./login-cliente-controller.service";

@Injectable({ providedIn: "root" })
export class LoginControllerService {
  constructor(
    private general: GeneralUserControllerService,
    private cliente: LoginClienteControllerService
  ) {}

  init() {
    this.general.clearStorege();
  }

  async login(component: LoginComponent) {
    this.cliente.login(component);
  }
}
