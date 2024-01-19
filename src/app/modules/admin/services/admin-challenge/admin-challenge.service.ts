import { Injectable } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session.service';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { Challenge } from '../../../events/interfaces/challenge.interface';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminChallengeService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly requestHelper: HttpHelper
  ) {}

  public getChallengesToApprove(): Observable<Challenge[]> {
    return this.requestHelper.get<Challenge[]>({
      url: endpoints.HOST + endpoints.ADMIN.GET_CHALLENGES_TO_APPROVE,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public approveChallenge(challengeId: string): Observable<void> {
    return this.requestHelper.patch({
      url: `${
        endpoints.HOST + endpoints.ADMIN.APPROVE_CHALLENGE
      }/${challengeId}`,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public rejectChallenge(challengeId: string, text: string): Observable<void> {
    return this.requestHelper.patch<void, { text: string }>({
      url: `${
        endpoints.HOST + endpoints.ADMIN.REJECT_CHALLENGE
      }/${challengeId}`,
      body: { text },
      token$: this.sessionService.getSessionToken(),
    });
  }
}
