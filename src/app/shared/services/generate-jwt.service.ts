import * as moment from "moment";
import * as crypto from "crypto-js";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GenerateJwtService {
  generate(sub: string | number, nome: string, email: string) {
    let header: any = {
      alg: "HS256",
      typ: "JWT",
    };
    header = crypto.enc.Utf8.parse(JSON.stringify(header));
    header = this.base64url(header);

    const exp = moment().add(30, "days").toDate();

    const iat = moment().toDate();

    let payload: any = { iat, exp, sub, nome, email };

    payload = crypto.enc.Utf8.parse(JSON.stringify(payload));
    payload = this.base64url(payload);

    let token = header.concat(".", payload);

    let signature: any = crypto.HmacSHA256(token, environment.jwt_key);
    signature = this.base64url(signature);

    token = token.concat(".", signature);

    return token;
  }

  private base64url(source: any) {
    let encodedSource = crypto.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, "");

    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
  }

  private parseJwt(token: string) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  isTokenExpired(token: string) {
    const payload = this.parseJwt(token);

    const exp = moment(payload.exp);

    const diff = moment(exp).diff(moment(), "seconds");

    return diff <= 0;
  }
}
