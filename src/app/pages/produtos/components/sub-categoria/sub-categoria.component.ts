import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubCategoria } from "../../entities/sub-categoria";
import { SelectionModel } from "@angular/cdk/collections";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ListarSubCategoriasService } from "../../use-cases/listar-sub-categorias.service ";
import { IncluirSubCategoriaService } from "../../use-cases/incluir-sub-categoria.service";
import { EditarSubCategoriaService } from "../../use-cases/editar-sub-categoria.service";
import { SubCategoriaError } from "../../error/sub-categoria-error";

interface DialogData {
  categoria_id: string;
}

@Component({
  selector: "app-sub-categoria",
  templateUrl: "./sub-categoria.component.html",
  styleUrls: ["./sub-categoria.component.scss"],
})
export class SubCategoriaComponent implements OnInit {
  subCategorias: SubCategoria[] = [];
  datasource = new MatTableDataSource<SubCategoria>();
  selection = new SelectionModel<SubCategoria>(false, []);
  subCategoria?: SubCategoria;
  displayedColumns = ["descricao"];

  processando = false;
  form: FormGroup = this.fb.group({ descricao: ["", [Validators.required]] });

  constructor(
    public dialogRef: MatDialogRef<SubCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private listarSubCategorias: ListarSubCategoriasService,
    private incluirSubCategoria: IncluirSubCategoriaService,
    private editarSubCategoria: EditarSubCategoriaService,
    private snack: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    this.processando = true;
    this.subCategorias = await this.listarSubCategorias.listar(
      this.data.categoria_id
    );
    this.processando = false;

    return this.populateDatasource();
  }

  private populateDatasource() {
    this.datasource.data = this.subCategorias;
  }

  onNoClick = () => this.dialogRef.close({ response: false });
  onSelectRow() {
    if (!this.subCategoria) {
      this.snack.open("Selecione uma categoria", "", { duration: 3500 });
      return;
    }

    this.dialogRef.close({ response: true, data: this.subCategoria });
  }

  clearForm = (inputdescricao: any) => {
    this.form.reset();
    inputdescricao.focus();
  };

  selectRow(row: SubCategoria, inputdescricao: any) {
    this.selection.toggle(row);
    this.subCategoria = this.selection.selected.length
      ? this.selection.selected[0]
      : undefined;

    const descricao = this.subCategoria ? this.subCategoria.descricao : "";

    this.form.get("descricao")?.setValue(descricao);
    inputdescricao.focus();
  }

  async onHanddle() {
    if (!this.subCategoria) return this.incluir();

    return this.editar();
  }

  private async incluir() {
    if (this.processando) return;
    this.processando = true;
    const subCategoria: SubCategoria = {
      uid: "",
      categoria_id: this.data.categoria_id,
      descricao: this.form.get("descricao")?.value,
    };

    const response = await this.incluirSubCategoria.incluir(subCategoria);

    if (response instanceof SubCategoriaError) {
      this.processando = false;
      this.snack.open(response.message, "", { duration: 2500 });
      return;
    }

    const message = "Categoria salva com sucesso!";
    this.snack.open(message, "", { duration: 2500 });
    this.processando = false;
    this.loadData();
  }

  private async editar() {
    if (this.processando) return;
    this.processando = true;

    this.subCategoria!.descricao = this.form.get("descricao")?.value;
    const response = await this.editarSubCategoria.editar(this.subCategoria!);

    if (response instanceof SubCategoriaError) {
      this.processando = false;
      this.snack.open(response.message, "", { duration: 2500 });
      return;
    }

    const message = "Categoria salva com sucesso!";
    this.snack.open(message, "", { duration: 2500 });
    this.processando = false;
    this.loadData();
  }
}
