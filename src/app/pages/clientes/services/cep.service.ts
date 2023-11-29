import { Injectable } from "@angular/core";
import { estados } from "../entities/estados";
import cepPromise from "cep-promise";
import { Cep } from "../entities/cep";
import { CepError } from "../errors/cep-error";

@Injectable({ providedIn: "root" })
export class CepService {
  constructor() {}

  async pesquisar(cep: string) {
    try {
      const result = await cepPromise(cep);

      const estado = estados.find((e) => e.sigla === result.state)!;

      return {
        cep,
        estado,
        cidade: result.city,
        logradouro: result.street,
        bairro: result.neighborhood,
        servico: result.service,
      } as Cep;
    } catch (error) {
      return new CepError("Houve um erro ao pesquisar o CEP");
    }
  }
}
