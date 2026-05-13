import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'vinod' && this.password === 'vinod123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
