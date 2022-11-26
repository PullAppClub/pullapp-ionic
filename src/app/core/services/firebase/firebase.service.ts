import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginProvider } from '../../enums/auth.enum';
import { LoginProviderResponse } from '../../types/auth.type';
import { LoginParams } from '../../interfaces/user-auth.interface';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Notification } from '@capacitor-firebase/messaging/dist/esm/definitions';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private currentMessage: BehaviorSubject<Notification> = new BehaviorSubject(
    null as any
  );

  public async createUserWithEmailAndPassword(
    params: LoginParams
  ): Promise<void> {
    await FirebaseAuthentication.createUserWithEmailAndPassword(params);
  }

  public async loginProvider(
    provider: LoginProvider
  ): Promise<LoginProviderResponse> {
    switch (provider) {
      case LoginProvider.Google:
        return await FirebaseAuthentication.signInWithGoogle();
      case LoginProvider.Facebook:
        return await FirebaseAuthentication.signInWithFacebook();
      case LoginProvider.Email:
        return FirebaseAuthentication.signInWithEmailAndPassword;
    }
  }

  public async logout(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  public async getIdToken(): Promise<string> {
    const { token } = await FirebaseMessaging.getToken();

    return token;
  }

  public async forgotPassword(email: string): Promise<void> {
    await FirebaseAuthentication.sendPasswordResetEmail({ email });
  }

  public async changeEmail(email: string): Promise<void> {
    await FirebaseAuthentication.updateEmail({ newEmail: email });
  }

  public async changePassword(password: string): Promise<void> {
    await FirebaseAuthentication.updatePassword({ newPassword: password });
  }

  public async requestPermission(): Promise<void> {
    await FirebaseMessaging.requestPermissions();
  }

  public receiveMessage(): void {
    FirebaseMessaging.addListener('notificationReceived', event => {
      console.log('notificationReceived', { event });

      this.currentMessage.next(event.notification);
    });
  }

  public getCurrentMessage(): BehaviorSubject<Notification> {
    return this.currentMessage;
  }

  public async getFCMToken(): Promise<string> {
    const result = await FirebaseMessaging.getToken();

    return result.token;
  }
}
