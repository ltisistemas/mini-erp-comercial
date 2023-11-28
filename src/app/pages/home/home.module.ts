import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./components/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeControllerService } from "./domain/controllers/home-controller.service";
import { MaterialModule } from "src/app/shared/utils/material.module";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [HomeControllerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
