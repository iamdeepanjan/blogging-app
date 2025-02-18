import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const canactivaterouteGuard: CanActivateFn = (route, state) => {
  const authService:AuthenticationService = inject(AuthenticationService);

  if (!authService.isLoggedIn()) {
    inject(Router).navigate(['login']);
    return false;
  }
  return true;
};
