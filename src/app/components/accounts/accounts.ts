import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {

  accounts: any[] = [];
  message = '';
  errorMessage = '';
  activeTab = 'create';

  newAccount = {
    ownerName: '',
    email: '',
    accountType: 'SAVINGS'
  };

  deposit = {
    accountNumber: '',
    amount: 0 as number | null
  };

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => this.errorMessage = 'Error loading accounts!'
    });
  }

  createAccount() {
    if (!this.newAccount.ownerName || !this.newAccount.email) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }
    this.accountService.createAccount(this.newAccount).subscribe({
      next: (data) => {
        this.message = 'Account created! Number: '
          + data.accountNumber;
        this.errorMessage = '';
        this.newAccount = {
          ownerName: '',
          email: '',
          accountType: 'SAVINGS'
        };
        this.loadAccounts();
      },
      error: (err) => this.errorMessage = 'Error creating account!'
    });
  }

  depositMoney() {
    if (!this.deposit.accountNumber || !this.deposit.amount) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }
    if (this.deposit.amount <= 0) {
      this.errorMessage = 'Amount must be greater than 0!';
      return;
    }
    this.accountService.depositMoney(this.deposit).subscribe({
      next: (data) => {
        this.message = 'Deposited $' + this.deposit.amount
          + ' successfully!';
        this.errorMessage = '';
        this.deposit = { accountNumber: '', amount: 0 };
        this.loadAccounts();
      },
      error: (err) => this.errorMessage = 'Error depositing money!'
    });
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        this.message = 'Account deleted successfully!';
        this.loadAccounts();
      },
      error: (err) => this.errorMessage = 'Error deleting account!'
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.message = '';
    this.errorMessage = '';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
  goHome(){
  this.router.navigate(['/dashboard']);
}
}

