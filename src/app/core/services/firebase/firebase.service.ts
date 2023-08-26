import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { LoginProvider } from '../../enums/auth.enum';
import { LoginProviderResponse } from '../../types/auth.type';
import { LoginParams } from '../../interfaces/user-auth.interface';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../toast/toast.service';
import { ToastType } from '../../enums/toast.enum';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly angularFireMessaging: AngularFireMessaging,
    private readonly toastService: ToastService
  ) {
    if (environment?.useFirebaseEmulator) {
      angularFireAuth.useEmulator('http://localhost:9099');
    }

    angularFireMessaging.messages.subscribe(payload => {
      console.log('message received. ', payload);

      toastService.showToast({
        msg: payload?.notification?.body as string,
        title: payload?.notification?.title as string,
        type: ToastType.Info,
      });
    });
  }

  public async createUserWithEmailAndPassword(
    params: LoginParams
  ): Promise<void> {
    await this.angularFireAuth.setPersistence('local');

    await this.angularFireAuth.createUserWithEmailAndPassword(
      params.email,
      params.password
    );
  }

  public async loginProvider(
    provider: LoginProvider
  ): Promise<LoginProviderResponse> {
    await this.angularFireAuth.setPersistence('local');

    switch (provider) {
      case LoginProvider.Google:
        return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
      case LoginProvider.Facebook:
        return this.angularFireAuth.signInWithPopup(new FacebookAuthProvider());
      case LoginProvider.Email:
        return this.angularFireAuth.signInWithEmailAndPassword;
    }
  }

  public async logout(): Promise<void> {
    await this.angularFireAuth.signOut();
  }

  public async getIdToken(): Promise<string> {
    return (await firstValueFrom(
      this.angularFireAuth.idToken
    )) as unknown as Promise<string>;
  }

  public observeIdToken(): Observable<string | null> {
    return this.angularFireAuth.idToken;
  }

  public refreshIdToken(): Promise<string> {
    return new Promise(resolve => {
      this.angularFireAuth.user.subscribe(user => {
        user
          ?.getIdTokenResult(true)
          ?.then(idTokenResult => resolve(idTokenResult.token));
      });
    });
  }

  public async forgotPassword(email: string): Promise<void> {
    this.angularFireAuth
      .sendPasswordResetEmail(email)
      .then(data => console.log(data));
  }

  public async changeEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.user.subscribe(user => {
        user
          ?.updateEmail(email)
          ?.then(data => resolve(data))
          ?.catch(error => reject(error));
      });
    });
  }

  public async getEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.user.subscribe({
        next: data => {
          resolve(data?.email as string);
        },
        error: error => {
          console.log(error);
          reject(error);
        },
      });
    });
  }

  public async getUsername(): Promise<string | null | undefined> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.user.subscribe({
        next: data => {
          resolve(data?.displayName);
        },
        error: error => {
          console.log(error);
          reject(error);
        },
      });
    });
  }

  public async changePassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.user.subscribe(user => {
        user
          ?.updatePassword(password)
          ?.then(data => resolve(data))
          ?.catch(error => reject(error));
      });
    });
  }

  public async deleteUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.user.subscribe(user => {
        user
          ?.delete()
          ?.then(() => resolve())
          ?.catch(error => reject(error));
      });
    });
  }

  public async requestPermission(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.angularFireMessaging.requestPermission.subscribe({
        next: data => {
          console.log('permission allowed', data);
          resolve();
        },
        error: error => {
          console.log('permission denied', error);
          reject(error);
        },
      });
    });
  }

  public getFCMToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.angularFireMessaging.requestToken.subscribe({
        next: token => {
          if (token) resolve(token);
          else reject('No token');
        },
        error: error => reject(error),
      });
    });
  }
}
