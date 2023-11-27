export class Cliente {
  uid: string;
  nome_fantasia: string;
  razao_social?: string;
  cpf_cnpj?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  estado_uf?: string;
  status?: 'ATIVO' | 'INATIVO';

  constructor(t: Cliente) {
    this.uid = t.uid;
    this.razao_social = t.razao_social;
    this.nome_fantasia = t.nome_fantasia;
    this.cpf_cnpj = t.cpf_cnpj;
    this.email = t.email;
    this.telefone = t.telefone;
    this.cep = t.cep;
    this.logradouro = t.logradouro;
    this.numero = t.numero;
    this.complemento = t.complemento;
    this.bairro = t.bairro;
    this.cidade = t.cidade;
    this.estado = t.estado;
    this.estado_uf = t.estado_uf;
    this.status = t.status ?? 'ATIVO';
  }
}
