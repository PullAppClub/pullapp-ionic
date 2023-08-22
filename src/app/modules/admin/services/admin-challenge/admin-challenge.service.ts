import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { Challenge } from '../../../events/interfaces/challenge.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminChallengeService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly requestHelper: RequestHelper
  ) {}

  public async getChallengesToApprove(): Promise<Challenge[]> {
    return this.requestHelper.get<Challenge[]>({
      url: endpoints.HOST + endpoints.ADMIN.GET_CHALLENGES_TO_APPROVE,
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async approveChallenge(challengeId: string): Promise<void> {
    await this.requestHelper.put({
      url: `${
        endpoints.HOST + endpoints.ADMIN.APPROVE_CHALLENGE
      }/${challengeId}`,
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async rejectChallenge(
    challengeId: string,
    text: string
  ): Promise<void> {
    await this.requestHelper.put<void, { text: string }>({
      url: `${
        endpoints.HOST + endpoints.ADMIN.REJECT_CHALLENGE
      }/${challengeId}`,
      params: { text },
      token: await this.sessionService.getSessionToken(),
    });
  }
}
