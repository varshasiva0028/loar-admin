import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole();
  const url = state.url;

  if (url.startsWith('/admin')) {
    if (role === 'admin') {
      return true;
    }
    router.navigate(['/admin/login']);
    return false;
  }

  if (url.startsWith('/sradmin')) {
    if (role === 'superadmin') {
      return true;
    }
    router.navigate(['/sradmin/login']);
    return false;
  }

  return true;
};