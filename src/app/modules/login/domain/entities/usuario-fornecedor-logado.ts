export class UsuarioFornecedorLogado {
  id: string;
  fornecedor_id?: string;
  google_id?: string;
  nome: string;
  email: string;
  password?: string | null;
  status: 'ATIVO' | 'INATIVO';
  profile?: 'ADMIN' | 'PROFESSOR' | 'ALUNO';

  constructor(t: UsuarioFornecedorLogado) {
    this.id = t.id;
    this.nome = t.nome;
    this.email = t.email;
    this.password = t.password;
    this.status = t.status;
    this.google_id = t.google_id;
    this.fornecedor_id = t.fornecedor_id;
    this.profile = t.profile;
  }
}
