import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ToastService } from '../toast/toast.service';
import { ToastType } from '../../enums/toast.enum';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toastService: ToastService
  ) {
    if (!environment.production) {
      this.firebaseService
        .getFCMToken()
        .then(token => console.log('FCM token', token));
    }
  }

  public observeNotifications(): void {
    this.firebaseService.receiveMessage();

    this.firebaseService.getCurrentMessage().subscribe(message => {
      this.toastService.showToast({
        msg: message?.notification?.body as string,
        title: message?.notification?.title as string,
        type: ToastType.Info,
      });
    });
  }
}
