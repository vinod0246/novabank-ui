import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Accounts } from './components/accounts/accounts';
import { Transactions } from './components/transactions/transactions';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'accounts',
    component: Accounts,
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    component: Transactions,
    canActivate: [authGuard]
  }
];