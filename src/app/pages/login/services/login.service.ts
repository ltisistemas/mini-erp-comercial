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

    return {
      data: {
        ...data,
        id: doc.id,
      } as UsuarioLogado,
      statusCode: 200,
      message: "Usuário encontrado com sucess",
    } as ResponseMessage;
  }
}
