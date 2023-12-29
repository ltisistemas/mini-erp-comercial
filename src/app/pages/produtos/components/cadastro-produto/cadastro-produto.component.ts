import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Produto } from "../../entities/produto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { Categoria } from "../../entities/categoria";
import { SubCategoria } from "../../entities/sub-categoria";
import { CategoriasComponent } from "../categorias/categorias.component";
import { SubCategoriaComponent } from "../sub-categoria/sub-categoria.component";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { MatSnackBar } from "@angular/material/snack-bar";

interface DialogData {
  produto?: Produto;
}

@Component({
  selector: "app-cadastro-produto",
  templateUrl: "./cadastro-produto.component.html",
  styleUrls: ["./cadastro-produto.component.scss"],
})
export class CadastroProdutoComponent implements OnInit {
  form: FormGroup;
  usuarioLogado: UsuarioLogado = this.getUsuario.buscarUsuarioLogado();

  categoria?: Categoria;
  subCategoria?: SubCategoria;

  get titulo() {
    return this.data.produto ? "Editar Produto" : "Adicionar Produto";
  }

  constructor(
    public dialogRef: MatDialogRef<CadastroProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private getUsuario: UsuarioLogadoUsecaseService,
    private fb: FormBuilder,
    private utils: UtilsService,
    private snack: MatSnackBar
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

  ngOnInit() {}

  onNoClick = () => this.dialogRef.close();
  async onHanddle() {}

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
    this.limparSubCategoria(inputcategoria_id);
  }
  limparSubCategoria(inputsub_categoria_id: any) {
    this.subCategoria = undefined;
    this.form.get("sub_categoria_id")?.setValue("");

    inputsub_categoria_id.focus();
  }
}
