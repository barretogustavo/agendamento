import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MenuModule } from "src/app/components/menu/menu.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ScheduleViewModule } from "../schedule-view/schedule-view.module";
import { ScheduleComponent } from "./schedule.component";

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    MenuModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    ScheduleViewModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
