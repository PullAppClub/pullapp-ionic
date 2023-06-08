import { Injectable } from '@angular/core';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { UpdateProfileInfoParams } from '../../types/profile.type';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public async checkUsername(username: string): Promise<void> {
    if (!username) return;

    await this.requestHelper.get<void>({
      url: endpoints.HOST + endpoints.PROFILE.CHECK_USERNAME,
      params: { username },
    });
  }

  public async updateUsername(username: string): Promise<void> {
    await this.requestHelper.put<void, { username: string }>({
      url: endpoints.HOST + endpoints.PROFILE.UPDATE_USERNAME,
      params: { username },
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async updateInfo(params: UpdateProfileInfoParams): Promise<void> {
    await this.requestHelper.put<void, UpdateProfileInfoParams>({
      url: endpoints.HOST + endpoints.PROFILE.UPDATE_INFO,
      params,
      token: await this.sessionService.getSessionToken(),
    });
  }
}
