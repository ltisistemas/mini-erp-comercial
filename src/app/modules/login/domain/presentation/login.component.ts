import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { LoginControllerService } from "../controllers/login-controller.service";
import { tiposDeClientes } from "../entities/tipo-login-enum";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  processando = false;
  credentials: FormGroup;

  tipoCliente = tiposDeClientes;

  constructor(
    private fb: FormBuilder,
    private controller: LoginControllerService
  ) {
    this.credentials = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.controller.init();
  }

  login = () => this.controller.login(this);
}
