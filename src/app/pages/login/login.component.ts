import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Token } from 'src/app/models';
import { UserService } from 'src/services/user.service';
import { LoginService } from './services/login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  error: string = '';
  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    if (this.userService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    this.loginService.login$().subscribe({
      next: (result) => this.onSuccess(result),
      error: () => this.onError(),
    });
  }

  onSuccess(result: Token) {
    this.snackBar.openFromComponent(ToastComponent, {
      duration: 3000,
      data: {
        message: `Logado com sucesso!.`,
      },
    });
    localStorage.setItem('token', JSON.stringify(result.token));
    this.userService.setAuthenticated(true);
    this.router.navigate(['/home']);
  }

  onError() {
    this.snackBar.openFromComponent(ToastComponent, {
      duration: 3000,
      data: {
        message: `Ocorreu um erro ao tentar logar.`,
      },
    });
    this.error =
      'Dados incorretos. Por favor, revise seus dados e tente novamente.';
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
