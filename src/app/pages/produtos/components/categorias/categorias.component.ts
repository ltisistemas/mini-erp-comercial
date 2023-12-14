import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Categoria } from "../../entities/categoria";
import { MatTableDataSource } from "@angular/material/table";
import { ListarCategoriasService } from "../../use-cases/listar-categorias.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IncluirCategoriaService } from "../../use-cases/incluir-categoria.service";
import { CategoriaError } from "../../error/categoria-error";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { SelectionModel } from "@angular/cdk/collections";
import { EditarCategoriaService } from "../../use-cases/editar-categoria.service";
import { LtiLoadingService } from "src/app/shared/services/lti-loading.service";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  datasource = new MatTableDataSource<Categoria>();
  selection = new SelectionModel<Categoria>(false, []);
  categoria?: Categoria;
  displayedColumns = ["descricao"];

  processando = false;
  panelOpenState = true;
  form: FormGroup = this.fb.group({ descricao: ["", [Validators.required]] });

  constructor(
    public dialogRef: MatDialogRef<CategoriasComponent>,
    private listarCategorias: ListarCategoriasService,
    private incluirCategoria: IncluirCategoriaService,
    private editarCategoria: EditarCategoriaService,
    private usuarioService: UsuarioLogadoUsecaseService,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private loadingService: LtiLoadingService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    this.loadingService.$show.next(true);
    this.categorias = await this.listarCategorias.listar();
    this.loadingService.$show.next(false);

    return this.populateDatasource();
  }

  private populateDatasource() {
    this.datasource.data = this.categorias;
  }

  onNoClick = () => this.dialogRef.close({ response: false });
  onSelectRow() {
    if (!this.categoria) {
      this.snack.open("Selecione uma categoria", "", { duration: 3500 });
      return;
    }

    this.dialogRef.close({ response: true, data: this.categoria });
  }

  clearForm = (inputdescricao: any) => {
    this.form.reset();
    inputdescricao.focus();
  };

  selectRow(row: Categoria, inputdescricao: any) {
    this.selection.toggle(row);
    this.categoria = this.selection.selected.length
      ? this.selection.selected[0]
      : undefined;

    const descricao = this.categoria ? this.categoria.descricao : "";

    this.form.get("descricao")?.setValue(descricao);
    inputdescricao.focus();
  }

  async onHanddle() {
    if (!this.categoria) return this.incluir();

    return this.editar();
  }

  private async incluir() {
    if (this.processando) return;
    this.processando = true;
    this.loadingService.$show.next(true);

    const usuario = this.usuarioService.buscarUsuarioLogado();
    const categoria: Categoria = {
      uid: "",
      empresa_id: usuario.empresa_id,
      descricao: this.form.get("descricao")?.value,
    };

    const response = await this.incluirCategoria.incluir(categoria);

    if (response instanceof CategoriaError) {
      this.snack.open(response.message, "", { duration: 2500 });
      return;
    }

    const message = "Categoria salva com sucesso!";
    this.snack.open(message, "", { duration: 2500 });
    this.panelOpenState = false;
    this.loadData();
  }

  private async editar() {
    if (this.processando) return;
    this.processando = true;
    this.loadingService.$show.next(true);

    this.categoria!.descricao = this.form.get("descricao")?.value;
    const response = await this.editarCategoria.editar(this.categoria!);

    if (response instanceof CategoriaError) {
      this.snack.open(response.message, "", { duration: 2500 });
      return;
    }

    const message = "Categoria salva com sucesso!";
    this.snack.open(message, "", { duration: 2500 });
    this.panelOpenState = false;
    this.loadData();
  }
}
