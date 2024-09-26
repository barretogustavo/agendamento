import { ScheduleState } from "./state/schedule/schedule.state";

import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "./pages/login/login.module";
import { MenuModule } from "./components/menu/menu.module";
import { ConfirmationModalModule } from "./components/confirmation-modal/confirmation-modal.module";

import { AppComponent } from "./app.component";
import { ToastComponent } from "./components/toast/toast.component";
import { CreateScheduleModule } from "./pages/create-schedule/create-schedule.module";
import { ScheduleViewModule } from "./pages/schedule-view/schedule-view.module";
import { ScheduleModule } from "./pages/schedule/schedule.module";

@NgModule({
  declarations: [AppComponent, ToastComponent],
  imports: [
    MenuModule,
    LoginModule,
    ScheduleViewModule,
    AppRoutingModule,
    CreateScheduleModule,
    ScheduleModule,
    ConfirmationModalModule,
    NgxsModule.forRoot([ScheduleState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
