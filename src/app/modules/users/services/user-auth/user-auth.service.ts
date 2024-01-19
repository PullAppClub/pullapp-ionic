import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { LoginParams } from '../../../../core/interfaces/user-auth.interface';
import { LoginProvider } from '../../../../core/enums/auth.enum';
import { FirebaseEmailPasswordProvider } from '../../../../core/types/auth.type';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ThirdPartyProvider } from '../../../../core/enums/third-part-provider';
import { UserAccountService } from '../user-account/user-account.service';
import {
  catchError,
  from,
  map,
  mergeMap,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly sessionService: SessionService,
    private readonly requestHelper: HttpHelper,
    private readonly userAccountService: UserAccountService
  ) {}

  public async loginWithEmailAndPassword(params: LoginParams): Promise<void> {
    const loginProvider = (await this.firebaseService.loginProvider(
      LoginProvider.Email
    )) as FirebaseEmailPasswordProvider;

    await loginProvider(params.email, params.password);
    this.userAccountService.addFCMToken();
  }

  public async loginWithPopup(provider: LoginProvider): Promise<void> {
    await this.firebaseService.loginProvider(provider);
  }

  public async logout(): Promise<void> {
    await this.firebaseService.logout();
  }

  public registerWithEmailAndPassword(params: LoginParams): Observable<void> {
    const createUserWithEmailAndPassword = from(
      this.firebaseService.createUserWithEmailAndPassword(params)
    );

    return createUserWithEmailAndPassword.pipe(
      tap(() => this.sessionService.getSessionToken()),
      tap(() => this.userAccountService.addFCMToken())
    );
  }

  public changePassword(password: string): Observable<void> {
    return this.requestHelper
      .get<{
        provider: ThirdPartyProvider;
      }>({
        url: endpoints.HOST + endpoints.IDENTITY.GET_IDENTITY_PROVIDER,
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(
        map(({ provider }) => provider),
        mergeMap(provider => this.changePasswordByProvider(provider, password))
      );
  }

  private changePasswordByProvider(
    provider: ThirdPartyProvider,
    password: string
  ): Observable<void> {
    if (provider === ThirdPartyProvider.Firebase) {
      return this.firebaseService.changePassword(password);
    }

    throw new Error('Unknown provider');
  }
}
