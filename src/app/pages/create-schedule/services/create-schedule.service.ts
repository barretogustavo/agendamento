import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { ToastComponent } from "src/app/components/toast/toast.component";
import { Schedules } from "src/app/models";
import { StoreSchedule, UpdateSchedule } from "src/app/state/schedule/schedule.state";

@Injectable()
export class CreateScheduleService {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      id: [null],
      patientName: [null, Validators.required],
      professionalName: [null, Validators.required],
      dateTime: [null, [Validators.required, Validators.pattern(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/)]],
      specialty: [null, Validators.required],
    });
  }

  get valid(): boolean {
    if (this.form.untouched) return false;

    return this.form.valid;
  }

  getFormValue(): Schedules {
    return this.form.value;
  }

  setFormValue(data: Schedules) {
    this.form.setValue(data);
  }

  getSpecialtiesList() {
    return this.http.get<any[]>("http://localhost:3000/specialtiesList");
  }

  onDeleteSchedule(id: number) {
    return this.http.delete(`http://localhost:3000/schedules/${id}`);
  }

  deleteSchedule(id: number) {
    this.onDeleteSchedule(id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: "Agendamento excluído com sucesso!",
          },
        });

        this.router.navigate(["/home"]);
      },
      error: (error) => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: `Erro ao tentar excluir o agendamento: ${error.message}`,
          },
        });
      },
    });
  }

  createSchedule() {
    const url = "http://localhost:3000/schedules";

    this.http.post(url, this.getFormValue()).subscribe({
      next: () => {
        const message = "Agendamento criado com sucesso!";

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message },
        });

        this.store.dispatch(new StoreSchedule(this.getFormValue()));
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        const errorMessage = "Erro ao tentar criar o agendamento";

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message: `${errorMessage}: ${error.message}` },
        });
      },
    });
  }

  updateSchedule() {
    const url = `http://localhost:3000/schedules/${this.getFormValue().id}`;

    this.http.put(url, this.getFormValue()).subscribe({
      next: () => {
        const message = "Agendamento atualizado com sucesso!";

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message },
        });

        this.store.dispatch(new UpdateSchedule(this.getFormValue()));
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        const errorMessage = "Erro ao tentar atualizar o agendamento";

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message: `${errorMessage}: ${error.message}` },
        });
      },
    });
  }

  submitForm(isEditMode: boolean) {
    if (this.valid) {
      if (isEditMode) {
        this.updateSchedule();
      } else {
        this.createSchedule();
      }
    } else {
      this.snackBar.openFromComponent(ToastComponent, {
        duration: 3000,
        data: {
          message: "Formulário inválido. Preencha todos os campos.",
        },
      });
    }
  }
}
