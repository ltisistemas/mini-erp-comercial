import { Injectable } from "@angular/core";
import { LoginService } from "../services/login.service";
import { ResponseMessage } from "src/app/shared/entities/response-message";
import { GenerateJwtService } from "src/app/shared/services/generate-jwt.service";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";
import { LocalStorageService } from "src/app/shared/services/localstorage.service";

@Injectable({ providedIn: "root" })
export class EfetuarLoginService {
  constructor(
    private service: LoginService,
    private jwt: GenerateJwtService,
    private local: LocalStorageService
  ) {}

  async efetuarLogin(
    email: string,
    password: string
  ): Promise<ResponseMessage> {
    const validarParametros = this.validarParametros(email, password);
    if (validarParametros.statusCode !== 200) {
      return validarParametros;
    }

    const response = await this.service.efetuarLogin(email, password);
    if (response.statusCode !== 200) {
      return response;
    }

    const usuarioLogado = {
      id: response.data.id,
      cliente_id: response.data.cliente_id,
      google_id: response.data.google_id,
      nome: response.data.nome,
      email: response.data.email,
      password: response.data.password,
      status: response.data.status,
      profile: response.data.profile,
    } as UsuarioLogado;

    const accessToken = this.jwt.generate(
      usuarioLogado.id,
      usuarioLogado.nome,
      usuarioLogado.email
    );

    this.local.setStore(usuarioLogado, accessToken);
    return {
      data: usuarioLogado,
      statusCode: 200,
      message: "Login Realizado com sucesso",
    } as ResponseMessage;
  }

  private validarParametros(email: string, password: string) {
    if (email === "") {
      return {
        data: null,
        statusCode: 400,
        message: "Preencha o campo e-mail",
      } as ResponseMessage;
    }

    if (password === "") {
      return {
        data: null,
        statusCode: 400,
        message: "Preencha o campo senha",
      } as ResponseMessage;
    }
    return {
      data: null,
      statusCode: 200,
      message: "",
    } as ResponseMessage;
  }
}
