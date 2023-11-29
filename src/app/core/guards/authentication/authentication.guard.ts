import { inject, Injectable } from '@angular/core';

import { SessionService } from '../../services/session/session.service';
import { NavigationHelper } from '../../helpers/navigation/navigation.helper';
import { CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  return inject(SessionService)
    .getSessionToken()
    .pipe(
      tap(token => {
        if (!token) {
          openSignInPage();
        }
      }),
      map(token => !!token)
    );
};

const openSignInPage = () => {
  inject(NavigationHelper).openPage({
    route: '/user/sign-in',
  });
};
