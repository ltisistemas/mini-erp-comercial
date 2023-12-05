import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit {
  processando = false;

  constructor(public dialogRef: MatDialogRef<CategoriasComponent>) {}

  ngOnInit() {}

  onNoClick = () => this.dialogRef.close();
}
