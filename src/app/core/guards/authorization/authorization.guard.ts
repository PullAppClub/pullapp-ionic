import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard {
  constructor(private session: SessionService) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    try {
      return this.session.checkRole(route.data['allowedRoles']);
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
