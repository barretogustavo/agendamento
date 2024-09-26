import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Schedules } from "../../models";
import { ScheduleState, StoreSchedule } from "../../state/schedule/schedule.state";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-schedule-view",
  templateUrl: "./schedule-view.component.html",
})
export class ScheduleViewComponent implements OnInit {
  @Select(ScheduleState.getSchedule) schedule$!: Observable<Schedules | null>;

  constructor(private store: Store, private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const scheduleIdParam = this.route.snapshot.paramMap.get("id");
    this.schedule$.subscribe((schedule) => {
      if (!schedule && scheduleIdParam) {
        this.fetchScheduleFromAPI(scheduleIdParam);
      }
    });
  }

  fetchScheduleFromAPI(scheduleId: string) {
    this.http
      .get<Schedules>(`http://localhost:3000/schedules/${scheduleId}`)
      .pipe(
        catchError((error) => {
          console.error("Erro ao obter o agendamento:", error);
          this.router.navigate(["/home"]);
          return [];
        })
      )
      .subscribe((data) => {
        this.store.dispatch(new StoreSchedule(data));
      });
  }
}
