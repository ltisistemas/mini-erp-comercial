import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './domain/presentation/usuarios.component';
import { UsuariosControllerService } from './domain/controllers/usuarios-controllers.service';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioAddDialogControllerService } from './domain/presentation/components/usuario-add-dialog/domain/controllers/usuario-add-dialog-controller.service';
import { UsuarioAddDialogComponent } from './domain/presentation/components/usuario-add-dialog/domain/presentation/usuario-add-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsuariosRoutingModule,
  ],
  declarations: [UsuariosComponent, UsuarioAddDialogComponent],
  providers: [UsuariosControllerService, UsuarioAddDialogControllerService],
})
export class UsuariosModule {}
