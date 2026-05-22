import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  transactions: any[] = [];
  accounts: any[] = [];
  message = '';
  errorMessage = '';

  transfer = {
    fromAccount: '',
    toAccount: '',
    amount: 0 as number | null,
    description: ''
  };

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: (err) => this.errorMessage = 'Error loading transactions!'
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.log('Error loading accounts')
    });
  }

  transferMoney() {
    if (!this.transfer.fromAccount ||
        !this.transfer.toAccount ||
        !this.transfer.amount) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }
    if (this.transfer.fromAccount === this.transfer.toAccount) {
      this.errorMessage = 'From and To accounts cannot be same!';
      return;
    }
    this.transactionService.transfer(this.transfer).subscribe({
      next: (data) => {
        this.message = 'Transfer successful!';
        this.errorMessage = '';
        this.transfer = {
          fromAccount: '',
          toAccount: '',
          amount: 0,
          description: ''
        };
        this.loadTransactions();
      },
      error: (err) => this.errorMessage = 'Transfer failed!'
    });
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.message = 'Transaction deleted!';
        this.loadTransactions();
      },
      error: (err) => this.errorMessage = 'Error deleting transaction!'
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  goHome() {
  this.router.navigate(['/dashboard']);
}
}

