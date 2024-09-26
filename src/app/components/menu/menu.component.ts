import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  constructor(private router: Router, private userService: UserService) {}

  logout() {
    this.userService.setAuthenticated(false);
    this.userService.setUserData(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
