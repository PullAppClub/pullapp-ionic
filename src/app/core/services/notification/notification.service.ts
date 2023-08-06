import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ToastService } from '../toast/toast.service';
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
      this.setMessagesReceiving();
    }
  }

  private async setMessagesReceiving(): Promise<void> {
    const token = await this.firebaseService.getFCMToken();

    console.log('FCM token', token);
  }
}
