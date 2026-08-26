import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  username = '';
  email = '';
  role = '';
  totalAccounts = 0;
  totalBalance = 0;
  loading = true;
  errorMessage = '';
  successMessage = '';

  // Change password fields
  showChangePassword = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  passwordSuccess = '';
  passwordLoading = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadAccountSummary();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.username = data.username;
        this.email = data.email;
        this.role = data.role;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Error loading profile!';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadAccountSummary() {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.totalAccounts = accounts.length;
        this.totalBalance = accounts.reduce(
          (sum: number, acc: any) => sum + acc.balance, 0);
        this.cdr.markForCheck();
      },
      error: (err) => console.log('Error loading accounts')
    });
  }

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  changePassword() {
    if (!this.currentPassword || 
        !this.newPassword || 
        !this.confirmPassword) {
      this.passwordError = 'Please fill all fields!';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'New passwords do not match!';
      return;
    }

    if (this.newPassword.length < 6) {
      this.passwordError = 
        'Password must be at least 6 characters!';
      return;
    }

    this.passwordLoading = true;
    this.passwordError = '';

    this.authService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (response) => {
        this.passwordSuccess =
          'Password changed successfully!';
        this.passwordLoading = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.cdr.markForCheck();
        setTimeout(() => {
          this.showChangePassword = false;
          this.passwordSuccess = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err) => {
        this.passwordError = err.error?.error ||
          'Error changing password!';
        this.passwordLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goHome() { this.router.navigate(['/dashboard']); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}