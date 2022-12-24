import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { NavigationHelper } from '../../helpers/navigation/navigation.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly navigationHelper: NavigationHelper
  ) {}

  async canActivate(): Promise<boolean> {
    const isLogged = !!(await this.sessionService.getSessionToken());

    if (!isLogged) {
      this.navigationHelper.openPage({
        route: '/users/sign-in',
      });
    }

    return isLogged;
  }
}
