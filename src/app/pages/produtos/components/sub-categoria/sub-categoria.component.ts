import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-sub-categoria",
  templateUrl: "./sub-categoria.component.html",
  styleUrls: ["./sub-categoria.component.scss"],
})
export class SubCategoriaComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SubCategoriaComponent>) {}

  ngOnInit() {}
}
