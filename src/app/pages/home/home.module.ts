import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./components/home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
