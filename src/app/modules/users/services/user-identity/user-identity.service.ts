import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ChangeEmailParams } from '../../types/identity.type';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  constructor(
    private readonly requestHelper: HttpHelper,
    private readonly sessionService: SessionService
  ) {}

  public changeEmail(params: ChangeEmailParams): Observable<void> {
    return this.requestHelper.put<void, ChangeEmailParams>({
      url: endpoints.HOST + endpoints.IDENTITY.CHANGE_EMAIL,
      body: params,
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
