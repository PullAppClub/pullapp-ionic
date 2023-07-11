import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class AdminChallengeService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly requestHelper: RequestHelper
  ) {}

  public async approveChallenge(challengeId: string): Promise<void> {
    await this.requestHelper.put({
      url: `${
        endpoints.HOST + endpoints.ADMIN.APPROVE_CHALLENGE
      }/${challengeId}`,
    });
  }
}
