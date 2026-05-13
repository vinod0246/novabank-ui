import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Accounts } from './components/accounts/accounts';
import { Transactions } from './components/transactions/transactions';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard },
  { path: 'accounts', component: Accounts },
  { path: 'transactions', component: Transactions }
];