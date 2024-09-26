import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';
import { Login, Token, UserData } from 'src/app/models';

@Injectable()
export class LoginService {
  public form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get valid(): boolean {
    if (this.form.untouched) return false;

    return this.form.valid;
  }

  getFormValue(): Login {
    return this.form.value;
  }

  login$(): Observable<Token> {
    this.submitted = true;

    if (this.form.invalid)
      return throwError(() => {
        return { invalidForm: true };
      });

    return this.authService.login(this.getFormValue());
  }
}
