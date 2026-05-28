import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (!this.username || !this.email ||
        !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage =
        'Password must be at least 6 characters!';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(
        this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          this.successMessage =
            'Registration successful! Redirecting...';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error ||
            'Registration failed!';
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}