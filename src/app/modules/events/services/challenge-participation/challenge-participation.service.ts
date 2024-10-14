import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { HttpMessageResponse } from '../../../../core/interfaces/http-request.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ChallengeParticipationService {
  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly sessionService: SessionService
  ) {}

  public createChallengeParticipation(params: {
    video: File;
    challengeId: string;
  }): Observable<HttpMessageResponse> {
    return this.httpHelper.upload({
      url: endpoints.HOST + endpoints.CHALLENGE_PARTICIPATION.CREATE,
      token$: this.sessionService.getSessionToken(),
      body: { challengeId: params.challengeId },
      file: params.video,
      fileName: 'video',
      showProgressBar: true,
    });
  }

  public approveChallengeParticipation(
    challengeParticipationId: string
  ): Observable<HttpMessageResponse> {
    return this.httpHelper.patch<HttpMessageResponse>({
      url: `${endpoints.HOST}${endpoints.CHALLENGE_PARTICIPATION.APPROVE}/${challengeParticipationId}`,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public rejectChallengeParticipation(
    challengeParticipationId: string,
    reason: string
  ): Observable<HttpMessageResponse> {
    return this.httpHelper.patch<HttpMessageResponse, { reason: string }>({
      url: `${endpoints.HOST}${endpoints.CHALLENGE_PARTICIPATION.REJECT}/${challengeParticipationId}`,
      token$: this.sessionService.getSessionToken(),
      body: { reason },
    });
  }
}
