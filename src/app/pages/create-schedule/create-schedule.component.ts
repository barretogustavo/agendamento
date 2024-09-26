import { Store } from "@ngxs/store";
import { Component } from "@angular/core";
import { Schedules, SelectItem } from "src/app/models";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { ScheduleState } from "src/app/state/schedule/schedule.state";
import { CreateScheduleService } from "./services/create-schedule.service";
import { ConfirmationModalComponent } from "src/app/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-create-schedule",
  templateUrl: "./create-schedule.component.html",
  providers: [CreateScheduleService],
})
export class CreateScheduleComponent {
  schedule: Schedules = this.createSchedule.getFormValue();

  isEditMode = false;
  specialtiesList: SelectItem[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public createSchedule: CreateScheduleService
  ) {
    this.route.url.subscribe({
      next: (url) => {
        this.isEditMode = url[0].path === "edit";
      },
    });
  }

  ngOnInit() {
    this.checkEditMode();
    this.fetchSpecialtiesList();
  }

  checkEditMode() {
    if (this.isEditMode) {
      const schedule = this.store.selectSnapshot(ScheduleState.getSchedule);
      if (schedule) {
        this.createSchedule.setFormValue({ ...schedule });
        this.schedule = { ...this.createSchedule.getFormValue() };
      } else {
        this.router.navigate(["/home"]);
      }
    }
  }

  fetchSpecialtiesList() {
    this.createSchedule.getSpecialtiesList().subscribe({
      next: (data) => {
        this.specialtiesList = data;
      },
      error: (error) => {
        console.error("Erro ao obter a lista de especialidades:", error);
      },
    });
  }

  formatDateTime() {
    const dateTimeControl = this.createSchedule.form.get("dateTime");
    if (dateTimeControl && dateTimeControl.value) {
      let inputValue = dateTimeControl.value.replace(/\D/g, "");

      if (inputValue.length > 0) {
        if (inputValue.length >= 2) {
          inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        }
        if (inputValue.length >= 5) {
          inputValue = `${inputValue.slice(0, 5)}/${inputValue.slice(5)}`;
        }
        if (inputValue.length >= 10) {
          inputValue = `${inputValue.slice(0, 10)} ${inputValue.slice(10)}`;
        }
        if (inputValue.length >= 13) {
          inputValue = `${inputValue.slice(0, 13)}:${inputValue.slice(13, 15)}`;
        }
      }

      dateTimeControl.setValue(inputValue, { emitEvent: false });
    }
  }

  openConfirmationModal(id: number, event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createSchedule.deleteSchedule(id);
      }
    });
  }
}
