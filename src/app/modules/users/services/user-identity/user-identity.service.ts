import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ChangeEmailParams } from '../../types/identity.type';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public async changeEmail(params: ChangeEmailParams): Promise<void> {
    await this.requestHelper.put<void, ChangeEmailParams>({
      url: endpoints.HOST + endpoints.IDENTITY.CHANGE_EMAIL,
      params,
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async getEmail(): Promise<string> {
    const { email } = await this.requestHelper.get<{ email: string }>({
      url: endpoints.HOST + endpoints.IDENTITY.GET_EMAIL,
      token: await this.sessionService.getSessionToken(),
    });

    return email;
  }
}
