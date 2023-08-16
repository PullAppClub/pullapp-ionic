import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { FirebaseService } from '../../../../core/services/firebase/firebase.service';
import { LoginParams } from '../../../../core/interfaces/user-auth.interface';
import { LoginProvider } from '../../../../core/enums/auth.enum';
import { FirebaseEmailPasswordProvider } from '../../../../core/types/auth.type';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ThirdPartyProvider } from '../../../../core/enums/third-part-provider';
import { UserAccountService } from '../user-account/user-account.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly sessionService: SessionService,
    private readonly requestHelper: RequestHelper,
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

  public async registerWithEmailAndPassword(
    params: LoginParams
  ): Promise<void> {
    await this.firebaseService.createUserWithEmailAndPassword(params);
    await this.sessionService.getSessionToken();

    this.userAccountService.addFCMToken().catch(error => console.log(error));
  }

  public async changePassword(password: string): Promise<void> {
    const { provider } = await this.requestHelper.get<{
      provider: string;
    }>({
      url: endpoints.HOST + endpoints.IDENTITY.GET_IDENTITY_PROVIDER,
      token: await this.sessionService.getSessionToken(),
    });

    if (provider === ThirdPartyProvider.Firebase) {
      await this.firebaseService.changePassword(password);
    }
  }
}
