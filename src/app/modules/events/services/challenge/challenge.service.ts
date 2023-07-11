import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { CreateChallengeParams } from '../../interfaces/challenge.interface';
import { HttpMessageResponse } from '../../../../core/interfaces/http-request.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService
  ) {}

  public async createGlobalChallenge(
    params: CreateChallengeParams
  ): Promise<HttpMessageResponse> {
    const { video, ...body } = params;
    return this.requestHelper.upload<
      HttpMessageResponse,
      Omit<CreateChallengeParams, 'video'>
    >({
      url: endpoints.HOST + endpoints.CHALLENGE.CREATE_GLOBAL,
      token: await this.sessionService.getSessionToken(),
      params: body,
      file: params.video,
      fileName: 'video',
    });
  }
}
