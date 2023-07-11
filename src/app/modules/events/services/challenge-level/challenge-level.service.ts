import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { ChallengeLevel } from '../../interfaces/challenge.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ChallengeLevelService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public async getAll(): Promise<ChallengeLevel[]> {
    return await this.requestHelper.get<ChallengeLevel[]>({
      url: endpoints.HOST + endpoints.CHALLENGE.LEVELS,
      token: await this.sessionService.getSessionToken(),
    });
  }
}
