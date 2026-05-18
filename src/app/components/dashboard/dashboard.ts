import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  username: string = '';
  accounts: any[] = [];
  transactions: any[] = [];
  totalBalance: number = 0;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';
    this.loadAccounts();
    this.loadTransactions();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.totalBalance = data.reduce(
          (sum: number, acc: any) => sum + acc.balance, 0);
      },
      error: (err) => console.log('Error loading accounts')
    });
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => this.transactions = data.slice(0, 5),
      error: (err) => console.log('Error loading transactions')
    });
  }

  goToAccounts() { this.router.navigate(['/accounts']); }
  goToTransactions() { this.router.navigate(['/transactions']); }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}