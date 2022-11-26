import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { NavigationHelper } from '../helpers/navigation/navigation.helper';
import { Routes } from '../enums/routes.enum';

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
      this.navigationHelper.goToByUrl({
        route: `${Routes.Login}`,
      });
    }

    return isLogged;
  }
}
