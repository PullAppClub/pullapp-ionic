import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { LoginParams } from '../../../../core/interfaces/user-auth.interface';
import { LoginProvider } from '../../../../core/enums/auth.enum';
import { FirebaseEmailPasswordProvider } from '../../../../core/types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly sessionService: SessionService
  ) {}

  public async loginWithEmailAndPassword(params: LoginParams): Promise<void> {
    const loginProvider = (await this.firebaseService.loginProvider(
      LoginProvider.Email
    )) as FirebaseEmailPasswordProvider;

    await loginProvider(params.email, params.password);
  }

  public async loginWithPopup(provider: LoginProvider): Promise<void> {
    await this.firebaseService.loginProvider(provider);
  }

  public async logout(): Promise<void> {
    await this.firebaseService.logout();
  }

  public async registerWithEmailAndPassword(
    params: LoginParams
  ): Promise<void> {
    await this.firebaseService.createUserWithEmailAndPassword(params);
    await this.sessionService.getSessionToken();
  }
}
