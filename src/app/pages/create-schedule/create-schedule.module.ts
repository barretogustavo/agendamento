import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { CreateScheduleComponent } from "./create-schedule.component";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MenuModule } from "src/app/components/menu/menu.module";

@NgModule({
  declarations: [CreateScheduleComponent],
  imports: [
    MenuModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    RouterModule.forChild([{ path: "", component: CreateScheduleComponent }]),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: "LL",
        },
        display: {
          dateInput: "DD/MM/YYYY",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY",
        },
      },
    },
  ],
})
export class CreateScheduleModule {}
