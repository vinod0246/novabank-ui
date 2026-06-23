import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
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
      },
      error: (err) => {
        this.errorMessage = 'Error loading profile!';
        this.loading = false;
      }
    });
  }

  loadAccountSummary() {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.totalAccounts = accounts.length;
        this.totalBalance = accounts.reduce(
          (sum: number, acc: any) => sum + acc.balance, 0);
      },
      error: (err) => console.log('Error loading accounts')
    });
  }

  goHome() { this.router.navigate(['/dashboard']); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}