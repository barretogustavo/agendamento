import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MenuModule } from "src/app/components/menu/menu.module";

import { ScheduleViewComponent } from "./schedule-view.component";

@NgModule({
  declarations: [ScheduleViewComponent],
  imports: [MenuModule, CommonModule, RouterModule, MatButtonModule, HttpClientModule],
  exports: [ScheduleViewComponent],
})
export class ScheduleViewModule {}
