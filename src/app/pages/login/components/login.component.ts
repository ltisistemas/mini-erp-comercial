import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tiposDeClientes } from "../entities/tipo-login-enum";
import { EfetuarLoginService } from "../use-cases/efetuar-login.service";
import { LocalStorageService } from "src/app/shared/services/localstorage.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LtiLoadingService } from "src/app/shared/services/lti-loading.service";

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
    private usecase: EfetuarLoginService,
    private local: LocalStorageService,
    private snack: MatSnackBar,
    private router: Router,
    private loadingService: LtiLoadingService
  ) {
    this.credentials = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.local.clearStorege();
  }

  async login() {
    let message = "";
    try {
      this.loadingService.$show.next(true);
      const { email, password } = this.credentials.value;

      const response = await this.usecase.efetuarLogin(email, password);
      message = response.message;

      if (response.statusCode !== 200) {
        this.loadingService.$show.next(false);
        this.snack.open(message, "Dispensar", { duration: 3500 });
        return;
      }

      this.loadingService.$show.next(false);
      this.snack.open(response.message, "Dispensar", { duration: 3500 });
      this.router.navigateByUrl("");
    } catch (error) {
      this.loadingService.$show.next(false);
      this.snack.open(message, "Dispensar", { duration: 3500 });
      return;
    }
  }
}
