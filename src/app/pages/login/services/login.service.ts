import { Injectable } from "@angular/core";
import { ResponseMessage } from "src/app/shared/entities/response-message";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { environment } from "src/environments/environment";
import * as bcrypt from "bcryptjs";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";

@Injectable({ providedIn: "root" })
export class LoginService {
  constructor(private api: FirebaseService) {}

  async efetuarLogin(
    email: string,
    password: string
  ): Promise<ResponseMessage> {
    try {
      const userDB = await this.api.getSnapshot({
        table: environment.tabelas.usuario,
        campo: "email",
        valor: email,
      });

      if (!userDB) {
        const message = "[USR001]: Usuário não encontrado";
        return {
          data: null,
          statusCode: 401,
          message,
        } as ResponseMessage;
      }

      const doc = userDB.docs[0];
      const data = doc.data() as UsuarioLogado;
      const compare = bcrypt.compareSync(password, data.password!);
      if (!compare) {
        const message = "[USR002]: Usuário / Senha não encontrado";
        return {
          data: null,
          statusCode: 401,
          message,
        } as ResponseMessage;
      }

      const dataResponse = {
        id: doc.id,
        email: data.email,
        nome: data.nome,
        empresa_id: data.empresa_id,
        status: data.status,
      } as UsuarioLogado;

      return {
        data: dataResponse,
        statusCode: 200,
        message: "Login realizado com sucesso",
      } as ResponseMessage;
    } catch (error: any) {
      return {
        data: error,
        statusCode: 401,
        message: error.message,
      } as ResponseMessage;
    }
  }
}
