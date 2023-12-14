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

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.scss"],
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  datasource = new MatTableDataSource<Produto>();
  displayedColumns = ["nome", "codigo_barras"];

  categoria?: Categoria;
  subCategoria?: SubCategoria;

  processando = false;
  panelOpenState = false;
  form: FormGroup;
  usuarioLogado: UsuarioLogado = this.getUsuario.buscarUsuarioLogado();

  constructor(
    public dialogRef: MatDialogRef<ProdutosComponent>,
    private listarService: ListarProdutosService,
    private getUsuario: UsuarioLogadoUsecaseService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
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

  categoriaF2() {
    const dialog = this.utils.abrirF2(CategoriasComponent, {});
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result.response) {
          if (this.categoria && result.data.uid !== this.categoria.uid) {
            this.subCategoria = undefined;
            this.form.get("sub_categoria_id")?.setValue("");
          }

          this.categoria = result.data;
          this.form.get("categoria_id")?.setValue(this.categoria?.descricao);
        }
      },
    });
  }

  subCategoriaF2() {
    if (!this.categoria) {
      const message = "Selecione uma categoria primeiro";
      this.snack.open(message, "", { duration: 2500 });
      return;
    }

    const dialog = this.utils.abrirF2(SubCategoriaComponent, {
      categoria_id: this.categoria.uid,
    });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result.response) {
          this.subCategoria = result.data;
          this.form
            .get("sub_categoria_id")
            ?.setValue(this.subCategoria?.descricao);
        }
      },
    });
  }
  limparCategoria(inputcategoria_id: any) {
    this.categoria = undefined;
    this.form.get("categoria_id")?.setValue("");

    inputcategoria_id.focus();
  }
  limparSubCategoria(inputsub_categoria_id: any) {
    this.subCategoria = undefined;
    this.form.get("sub_categoria_id")?.setValue("");

    inputsub_categoria_id.focus();
  }
}
