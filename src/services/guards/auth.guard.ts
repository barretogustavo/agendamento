import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAuthenticatedUser() || this.checkLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkLocalStorage(): boolean {
    const userData = localStorage.getItem('userData');

    if (userData) {
      this.userService.setAuthenticated(true);
      this.userService.setUserData(JSON.parse(userData));
      return true;
    }

    return false;
  }
}
