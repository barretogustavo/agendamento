import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { UserData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.setAuthenticated(true);
      this.userService
        .getUserDataByUsername(token)
        .subscribe((userData: UserData) => {
          this.userService.setUserData(userData);
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
