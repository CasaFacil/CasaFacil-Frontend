import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export function roleGuard(...allowedRoles: UserRole[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    if (auth.hasRole(...allowedRoles)) return true;

    router.navigate(['/']);
    return false;
  };
}
