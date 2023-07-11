import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { LoginProvider } from '../../enums/auth.enum';
import { LoginProviderResponse } from '../../types/auth.type';
import { LoginParams } from '../../interfaces/user-auth.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private currentMessage: BehaviorSubject<firebase.messaging.MessagePayload> =
    new BehaviorSubject(null as any);

  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly angularFireMessaging: AngularFireMessaging
  ) {
    if (environment?.useFirebaseEmulator) {
      angularFireAuth.useEmulator('http://localhost:9099');
    }

    angularFireMessaging.messages.subscribe(payload => {
      console.log('constructor received. ', payload);
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

  public getIdToken(): Promise<string> {
    return new Promise(resolve => {
      this.angularFireAuth.idToken.subscribe(token => {
        console.log(token);

        resolve(token as string);
      });
    });
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

  public receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe(payload => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  public getCurrentMessage(): BehaviorSubject<firebase.messaging.MessagePayload> {
    return this.currentMessage;
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
