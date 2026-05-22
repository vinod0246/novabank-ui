import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const token = localStorage.getItem('token');

  if (isLoggedIn === 'true' && token) {
    return true;
  }

  router.navigate(['/login']);
  return false; 
};

