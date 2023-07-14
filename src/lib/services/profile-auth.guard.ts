import { CanActivateFn, Router } from '@angular/router';
import { MainService } from './main.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const profileAuthGuard: CanActivateFn = () => {

  const main = inject(MainService);
  const router = inject(Router);

  return main.isLoggedIn.pipe(tap(value => {
    return !value ? router.navigate(['login']) : true;
  }))
};
