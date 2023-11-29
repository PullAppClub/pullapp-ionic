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
import {
  defer,
  firstValueFrom,
  from,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
} from 'rxjs';

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
        message: payload?.notification?.body as string,
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

  public getIdToken(): Observable<string | null> {
    return this.angularFireAuth.idToken;
  }

  public observeIdToken(): Observable<string | null> {
    return this.angularFireAuth.idToken;
  }

  public refreshIdToken(): Observable<string> {
    return from(
      this.angularFireAuth.currentUser.then(user =>
        user?.getIdTokenResult(true)
      )
    ).pipe(map(token => token?.token as string));
  }

  public async forgotPassword(email: string): Promise<void> {
    this.angularFireAuth
      .sendPasswordResetEmail(email)
      .then(data => console.log(data));
  }

  public changePassword(password: string): Observable<void> {
    return this.angularFireAuth.user.pipe(
      mergeMap(user => {
        if (user) {
          return from(user.updatePassword(password));
        }

        throw new Error('User not found');
      })
    );
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

  public getFCMToken(): Observable<string | null> {
    return this.angularFireMessaging.requestToken;
  }
}
