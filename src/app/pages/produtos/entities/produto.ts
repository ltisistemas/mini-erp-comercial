import { Caracteristica } from "./caracteristica";

export class Produto {
  uid: string;
  empresa_id: string;
  codigo_barras?: string;
  qr_code?: string;
  ncm?: string;
  nome: string;
  descricao: string;
  categoria_id: string;
  sub_categoria_id?: string;
  caracteristicas: Caracteristica[];

  constructor(t: Produto) {
    this.uid = t.uid;
    this.empresa_id = t.empresa_id;
    this.nome = t.nome;
    this.descricao = t.descricao;
    this.codigo_barras = t.codigo_barras ?? "";
    this.qr_code = t.qr_code ?? "";
    this.ncm = t.ncm ?? "";
    this.categoria_id = t.categoria_id;
    this.sub_categoria_id = t.sub_categoria_id ?? "";
    this.caracteristicas = t.caracteristicas ?? [];
  }
}
