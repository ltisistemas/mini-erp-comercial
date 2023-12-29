import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Produto } from "../../entities/produto";
import { MatTableDataSource } from "@angular/material/table";
import { ListarProdutosService } from "../../use-cases/listar-produtos.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { Categoria } from "../../entities/categoria";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { CategoriasComponent } from "../categorias/categorias.component";
import { SubCategoriaComponent } from "../sub-categoria/sub-categoria.component";
import { SubCategoria } from "../../entities/sub-categoria";
import { LtiLoadingService } from "src/app/shared/services/lti-loading.service";
import { CadastroProdutoComponent } from "../cadastro-produto/cadastro-produto.component";

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.scss"],
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  datasource = new MatTableDataSource<Produto>();
  displayedColumns = ["nome", "codigo_barras"];

  processando = false;
  panelOpenState = false;
  form: FormGroup;
  usuarioLogado: UsuarioLogado = this.getUsuario.buscarUsuarioLogado();

  constructor(
    public dialogRef: MatDialogRef<ProdutosComponent>,
    private listarService: ListarProdutosService,
    private getUsuario: UsuarioLogadoUsecaseService,
    private fb: FormBuilder,
    private utils: UtilsService,
    private loadingService: LtiLoadingService
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required]],
      codigo_barras: ["", []],
      qr_code: ["", []],
      ncm: ["", []],
      descricao: ["", []],
      categoria_id: { value: "", disabled: true },
      sub_categoria_id: ["", []],
    });
  }

  ngOnInit() {
    this.utils.setSize();

    this.loadData();
  }
  private async loadData() {
    this.loadingService.$show.next(true);
    this.produtos = await this.listarService.listar();
    this.loadingService.$show.next(false);
    return this.populateDatasource();
  }

  private populateDatasource() {
    this.datasource.data = this.produtos;
  }

  onNoClick = () => this.dialogRef.close();

  cadastroProduto(produto?: Produto) {
    const component = CadastroProdutoComponent;
    const data = { produto };

    this.utils.abrirModal({ component, data });
  }
}
