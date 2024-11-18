import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_URLS } from '~core/consts/urls.consts';
import { AuthenticationService } from '~features/authentication/services/authentication.service';

export const noAuthenticationGuard = () => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isUserLoggedIn()) {
    const router = inject(Router);
    router.navigate([USER_URLS.dashboard]);
    return false;
  }
  return true;
};
