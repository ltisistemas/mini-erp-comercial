import { Injectable } from '@angular/core';
import { UsuarioLogado } from '../entities/usuario-logado';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { UsuarioFornecedorLogado } from '../entities/usuario-fornecedor-logado';

@Injectable({ providedIn: 'root' })
export class GeneralUserControllerService {
  constructor() {}

  clearStorege() {
    localStorage.removeItem(environment.storage.usuario);
    localStorage.removeItem(environment.storage.token);
  }

  loadUsuarioLogado(usuario: any, uid: string, email: string) {
    const usuarioLogado = new UsuarioLogado({
      id: uid,
      cliente_id: usuario.cliente_id,
      nome: usuario.nome,
      email,
      status: usuario.status,
      google_id: usuario.google_id,
    });
    return usuarioLogado;
  }
  loadUsuarioFornecedorLogado(usuario: any, uid: string, email: string) {
    const usuarioLogado = new UsuarioFornecedorLogado({
      id: uid,
      fornecedor_id: usuario.fornecedor_id,
      nome: usuario.nome,
      email,
      status: usuario.status,
      google_id: usuario.google_id,
    });
    return usuarioLogado;
  }

  setStore(usuarioLogado: UsuarioLogado, accessToken: string) {
    localStorage.removeItem(environment.storage.usuario);
    localStorage.removeItem(environment.storage.token);

    localStorage.setItem(
      environment.storage.usuario,
      JSON.stringify(usuarioLogado)
    );
    localStorage.setItem(environment.storage.token, accessToken);
  }

  generateJWT(sub: string, nome: string, email: string) {
    let header: any = {
      alg: 'HS256',
      typ: 'JWT',
    };
    header = crypto.enc.Utf8.parse(JSON.stringify(header));
    header = this.base64url(header);

    const exp = moment().add(30, 'days').toDate();

    const iat = moment().toDate();

    let payload: any = { iat, exp, sub, nome, email };

    payload = crypto.enc.Utf8.parse(JSON.stringify(payload));
    payload = this.base64url(payload);

    let token = header.concat('.', payload);

    let signature: any = crypto.HmacSHA256(token, environment.jwt_key);
    signature = this.base64url(signature);

    token = token.concat('.', signature);

    return token;
  }

  private base64url(source: any) {
    let encodedSource = crypto.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  private parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  isTokenExpired(token: string) {
    const payload = this.parseJwt(token);

    const exp = moment(payload.exp);

    const diff = moment(exp).diff(moment(), 'seconds');

    return diff <= 0;
  }
}
