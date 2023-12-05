import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({ providedIn: "root" })
export class UtilsService {
  private _sizes = { width: "", height: "", innerHeight: 0, innerWidth: 0 };

  constructor(private dialog: MatDialog) {}

  setSize() {
    const win = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this._sizes.height = `${win.height}px`;
    this._sizes.width = `${win.width}px`;

    this._sizes.innerWidth = win.width;
    this._sizes.innerHeight = win.height;
  }

  abrirModal(options: {
    component: any;
    data: any;
    width?: number;
    height?: number;
  }) {
    const w = options.width
      ? String(this._sizes.innerWidth * options.width).concat("px")
      : this._sizes.width;

    const h = options.height
      ? String(this._sizes.innerHeight * options.height).concat("px")
      : this._sizes.height;

    return this.dialog.open(options.component, {
      width: w,
      minWidth: w,
      maxWidth: w,
      height: h,
      minHeight: h,
      maxHeight: h,
      disableClose: true,
      hasBackdrop: true,
      data: options.data,
    });
  }
}
