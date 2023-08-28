import { Injectable } from '@angular/core';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { UpdateProfileInfoParams, UserProfile } from '../../types/profile.type';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfile?: UserProfile;

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
    await this.requestHelper.patch<void, { username: string }>({
      url: endpoints.HOST + endpoints.PROFILE.UPDATE_USERNAME,
      params: { username },
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async updateInfo(params: UpdateProfileInfoParams): Promise<void> {
    await this.requestHelper.patch<void, UpdateProfileInfoParams>({
      url: endpoints.HOST + endpoints.PROFILE.UPDATE_INFO,
      params,
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async getProfile(): Promise<UserProfile> {
    if (this.userProfile) return this.userProfile;

    const profile = await this.requestHelper.get<UserProfile>({
      url: endpoints.HOST + endpoints.PROFILE.GET_PROFILE,
      token: await this.sessionService.getSessionToken(),
    });

    this.userProfile = {
      ...profile,
      birthday: new Date(profile.birthday),
    };

    return this.userProfile;
  }

  public async uploadAvatar(file: File): Promise<UserProfile> {
    this.userProfile = await this.requestHelper.upload<UserProfile, File>({
      url: endpoints.HOST + endpoints.PROFILE.UPLOAD_AVATAR,
      file,
      token: await this.sessionService.getSessionToken(),
      fileName: 'files',
    });

    return this.userProfile;
  }
}
