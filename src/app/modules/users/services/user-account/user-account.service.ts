import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService,
    private readonly firebaseService: FirebaseService
  ) {}

  public async addFCMToken(): Promise<void> {
    const fcmToken = await this.firebaseService.getFCMToken();
    await this.requestHelper.post<void, { fcmToken: string }>({
      url: endpoints.HOST + endpoints.ACCOUNT.FCM_TOKEN,
      params: {
        fcmToken,
      },
      token: await this.sessionService.getSessionToken(),
    });
  }
}
