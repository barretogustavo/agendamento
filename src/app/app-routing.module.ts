import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/guards/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { CreateScheduleComponent } from "./pages/create-schedule/create-schedule.component";
import { ScheduleViewComponent } from "./pages/schedule-view/schedule-view.component";
import { ScheduleComponent } from "./pages/schedule/schedule.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "schedules/:id",
    component: ScheduleViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "create",
    component: CreateScheduleComponent,
    canActivate: [AuthGuard],
  },
  { path: "edit", component: CreateScheduleComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
