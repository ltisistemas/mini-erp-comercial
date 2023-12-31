import {
  CUSTOM_ELEMENTS_SCHEMA,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
  isDevMode,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FirebaseService } from "./shared/utils/firebase.service";
import { ModulesModule } from "./pages/modules.module";
import { CommonModule, registerLocaleData } from "@angular/common";
import localePT from "@angular/common/locales/pt";
import { MaterialModule } from "./shared/utils/material.module";
import { environment } from "src/environments/environment";
import { JwtModule } from "@auth0/angular-jwt";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HomeService } from "./shared/services/home.service";
import { CoreControllerService } from "./pages/core/controllers/core-controller.service";
import { GenerateJwtService } from "./shared/services/generate-jwt.service";
import { LocalStorageService } from "./shared/services/localstorage.service";
import { UsuarioLogadoUsecaseService } from "./shared/use-cases/usuario-logado-usecase.service";
import { UsuarioLogadoService } from "./shared/services/usuario-logado.service";
import { UtilsService } from "./shared/utils/utils.service";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LtiLoadingService } from "./shared/services/lti-loading.service";
import { LtiLoadingComponent } from "./shared/components/lti-loading/lti-loading.component";

registerLocaleData(localePT);

export function tokenGetter() {
  return localStorage.getItem(environment.storage.token);
}

@NgModule({
  declarations: [AppComponent, LtiLoadingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModulesModule,
    MaterialModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),

    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,

    // for Core use:
    LoadingBarModule,
  ],
  providers: [
    FirebaseService,
    CoreControllerService,
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" },
    HomeService,
    UsuarioLogadoUsecaseService,
    UsuarioLogadoService,
    GenerateJwtService,
    LocalStorageService,
    UtilsService,
    LtiLoadingService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
