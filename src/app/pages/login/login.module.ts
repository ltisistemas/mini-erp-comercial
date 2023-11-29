import { NgModule } from "@angular/core";

import { LoginComponent } from "./components/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginService } from "./services/login.service";

@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}
