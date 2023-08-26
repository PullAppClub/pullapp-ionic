import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import {
  Challenge,
  ChallengeParticipant,
  CreateChallengeParams,
  HomePageChallenges,
} from '../../interfaces/challenge.interface';
import { HttpMessageResponse } from '../../../../core/interfaces/http-request.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ProfileBasicInfo } from '../../../users/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  /**
   * This property is used to pass the challenge to the challenge page.
   */
  private passedChallenge?: Challenge;

  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

  public setPassedChallenge(challenge: Challenge): void {
    this.passedChallenge = challenge;
  }

  public getPassedChallenge(): Challenge | undefined {
    return this.passedChallenge;
  }

  public async createGlobalChallenge(
    params: CreateChallengeParams
  ): Promise<void> {
    const { video, ...body } = params;
    const { message } = await this.requestHelper.upload<
      HttpMessageResponse,
      Omit<CreateChallengeParams, 'video'>
    >({
      url: endpoints.HOST + endpoints.CHALLENGE.CREATE_GLOBAL,
      token: await this.sessionService.getSessionToken(),
      params: body,
      file: params.video,
      fileName: 'video',
      showProgressBar: true,
    });

    this.toastService.showToast({
      msg: await this.langService.t(message),
      type: ToastType.Info,
      title: 'Challenge',
    });
  }

  public async getHomePageChallenges(): Promise<HomePageChallenges> {
    return this.requestHelper.get<HomePageChallenges>({
      url: endpoints.HOST + endpoints.CHALLENGE.GET_HOME_PAGE_CHALLENGES,
      token: await this.sessionService.getSessionToken(),
    });
  }

  public async getChallenge(id: string): Promise<Challenge> {
    return this.requestHelper.get<Challenge>({
      url: endpoints.HOST + endpoints.CHALLENGE.GET_CHALLENGE + id,
      token: await this.sessionService.getSessionToken(),
    });
  }
}
