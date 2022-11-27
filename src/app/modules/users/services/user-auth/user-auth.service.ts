import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private readonly sessionService: SessionService) {}
}
