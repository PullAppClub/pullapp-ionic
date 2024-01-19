import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { catchError, map, mergeMap, Observable, switchMap } from 'rxjs';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(
    private readonly requestHelper: HttpHelper,
    private readonly sessionService: SessionService,
    private readonly firebaseService: FirebaseService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  public addFCMToken(): void {
    this.firebaseService
      .getFCMToken()
      .pipe(switchMap(fcmToken => this.sendFCMToken(fcmToken as string)))
      .subscribe()
      .unsubscribe();
  }

  private sendFCMToken(fcmToken: string): Observable<void> {
    return this.requestHelper.post<void, { fcmToken: string }>({
      url: endpoints.HOST + endpoints.ACCOUNT.FCM_TOKEN,
      body: {
        fcmToken,
      },
      token$: this.sessionService.getSessionToken(),
    });
  }
}
