import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { PortalModule } from "@angular/cdk/portal";
import { LayoutModule } from "@angular/cdk/layout";
import { PlatformModule } from "@angular/cdk/platform";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { PtBrMatPaginatorIntl } from "./pt-br-mat-paginator-intl";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    PortalModule,
    LayoutModule,
    PlatformModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatRippleModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline", floatLabel: "always" },
    },
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
  ],
})
export class MaterialModule {}
