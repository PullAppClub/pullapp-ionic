import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { ProfileEvents } from '../../types/profile.type';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ProfileEventsService {
  constructor(
    private readonly requestHelper: HttpHelper,
    private readonly sessionService: SessionService
  ) {}

  public getProfileEvents(userId?: string): Observable<ProfileEvents> {
    const idObservable = userId
      ? of(userId)
      : this.sessionService
          .getParsedSessionToken()
          .pipe(map(token => token.userId));

    return idObservable.pipe(
      switchMap(id =>
        this.requestHelper.get<ProfileEvents>({
          url: `${endpoints.HOST}${endpoints.PROFILE.GET_PROFILE_EVENTS}/${id}`,
          token$: this.sessionService.getSessionToken(),
        })
      )
    );
  }
}
