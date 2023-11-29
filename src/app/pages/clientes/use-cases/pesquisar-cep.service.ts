import { Injectable } from "@angular/core";
import { CepError, CepNaoPreenchido } from "../errors/cep-error";
import { CepService } from "../services/cep.service";
import { Cep } from "../entities/cep";

@Injectable({ providedIn: "root" })
export class PesquisarCepService {
  constructor(private service: CepService) {}

  async pesquisarCEP(cep: string): Promise<Cep | CepError> {
    if (cep === "") {
      return new CepNaoPreenchido("Digite um Cep para realizar a pesquisa");
    }

    return this.service.pesquisar(cep);
  }
}
