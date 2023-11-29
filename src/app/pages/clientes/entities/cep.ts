export class Cep {
  cep: string;
  estado: { sigla: string; descricao: string };
  cidade: string;
  logradouro: string;
  bairro: string;
  servico: string;

  constructor(t: Cep) {
    this.cep = t.cep;
    this.estado = t.estado;
    this.cidade = t.cidade;
    this.logradouro = t.logradouro;
    this.bairro = t.bairro;
    this.servico = t.servico;
  }
}
