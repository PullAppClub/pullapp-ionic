import { Injectable } from '@angular/core';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { UpdateProfileInfoParams, UserProfile } from '../../types/profile.type';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public checkUsername(username: string): Observable<void> {
    return this.requestHelper
      .get<void>({
        url: endpoints.HOST + endpoints.PROFILE.CHECK_USERNAME,
        params: { username },
      })
      .pipe(take(1));
  }

  public updateUsername(username: string): Observable<void> {
    return this.requestHelper
      .patch<void, { username: string }>({
        url: endpoints.HOST + endpoints.PROFILE.UPDATE_USERNAME,
        body: { username },
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(take(1));
  }

  public updateInfo(params: UpdateProfileInfoParams): Observable<void> {
    return this.requestHelper
      .patch<void, UpdateProfileInfoParams>({
        url: endpoints.HOST + endpoints.PROFILE.UPDATE_INFO,
        body: params,
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(take(1));
  }

  public getProfile(): Observable<UserProfile> {
    return this.requestHelper
      .get<UserProfile>({
        url: endpoints.HOST + endpoints.PROFILE.GET_PROFILE,
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(take(1));
  }

  public uploadAvatar(file: File): Observable<UserProfile> {
    return this.requestHelper.upload<UserProfile, File>({
      url: endpoints.HOST + endpoints.PROFILE.UPLOAD_AVATAR,
      file,
      token$: this.sessionService.getSessionToken(),
      fileName: 'files',
    });
  }
}
