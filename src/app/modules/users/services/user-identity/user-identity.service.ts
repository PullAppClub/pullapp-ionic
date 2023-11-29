import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ChangeEmailParams } from '../../types/identity.type';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public changeEmail(params: ChangeEmailParams): Observable<void> {
    return this.requestHelper.put<void, ChangeEmailParams>({
      url: endpoints.HOST + endpoints.IDENTITY.CHANGE_EMAIL,
      params,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public getEmail(): Observable<string> {
    return this.requestHelper
      .get<{ email: string }>({
        url: endpoints.HOST + endpoints.IDENTITY.GET_EMAIL,
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(map(response => response.email));
  }
}
