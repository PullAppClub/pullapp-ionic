import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  return inject(SessionService).checkRole(route.data['allowedRoles']);
};
