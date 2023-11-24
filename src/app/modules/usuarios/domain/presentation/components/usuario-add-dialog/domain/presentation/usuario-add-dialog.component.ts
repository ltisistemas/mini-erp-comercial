import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modules/usuarios/domain/entities/usuario';
import { UsuarioAddDialogControllerService } from '../controllers/usuario-add-dialog-controller.service';

interface DialogData {
  clienteId: string;
  usuario?: Usuario;
}

@Component({
  selector: 'app-usuario-add-dialog',
  templateUrl: './usuario-add-dialog.component.html',
  styleUrls: ['./usuario-add-dialog.component.scss'],
})
export class UsuarioAddDialogComponent implements OnInit {
  form: FormGroup;
  processando = false;

  constructor(
    private controller: UsuarioAddDialogControllerService,
    public dialogRef: MatDialogRef<UsuarioAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.controller.init(this);
  }

  onNoClick(): void {
    this.dialogRef.close({ response: false, data: {} });
  }

  handdle = () => this.controller.handdle(this);
}
