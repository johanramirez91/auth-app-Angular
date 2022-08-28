import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logOut();
  }

  get usuario() {
    return this.authService.usuario;
  }
}
