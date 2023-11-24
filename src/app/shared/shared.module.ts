import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './utils/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxLoadingModule } from 'ngx-loading';
import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
  provideNgxMask,
} from 'ngx-mask';
import { ClipboardModule } from 'ngx-clipboard';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxDropzoneModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxLoadingModule,
    NgxDropzoneModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ClipboardModule,
  ],
  providers: [provideEnvironmentNgxMask(maskConfig), provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
