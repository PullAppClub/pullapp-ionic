import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import {
  Challenge,
  ChallengeFilters,
  ChallengeParticipant,
  CreateChallengeParams,
  CreateSponsoredChallengeParams,
  HomePageChallenges,
} from '../../interfaces/challenge.interface';
import { HttpMessageResponse } from '../../../../core/interfaces/http-request.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ProfileBasicInfo } from '../../../users/interfaces/user.interface';
import { map, Observable, switchMap, take } from 'rxjs';
import { CreateSponsoredChallengeResponse } from '../../interfaces/challenge-payment.interface';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  /**
   * This property is used to pass the challenge to the challenge page.
   */
  private passedChallenge?: Challenge;

  constructor(
    private readonly requestHelper: HttpHelper,
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

  public createGlobalChallenge(
    params: CreateChallengeParams
  ): Observable<HttpMessageResponse> {
    const { video, ...body } = params;

    return this.requestHelper.upload<
      HttpMessageResponse,
      Omit<CreateChallengeParams, 'video'>
    >({
      url: endpoints.HOST + endpoints.CHALLENGE.CREATE_GLOBAL,
      token$: this.sessionService.getSessionToken(),
      body,
      file: params.video,
      fileName: 'video',
      showProgressBar: true,
    });
  }

  public createSponsoredChallenge(
    params: CreateSponsoredChallengeParams
  ): Observable<CreateSponsoredChallengeResponse> {
    const { video, ...body } = params;

    return this.requestHelper.upload<
      CreateSponsoredChallengeResponse,
      Omit<CreateSponsoredChallengeParams, 'video'>
    >({
      url: endpoints.HOST + endpoints.CHALLENGE.CREATE_SPONSORED,
      token$: this.sessionService.getSessionToken(),
      body,
      file: params.video,
      fileName: 'video',
      showProgressBar: true,
    });
  }

  public getHomePageChallenges(): Observable<HomePageChallenges> {
    return this.requestHelper.get<HomePageChallenges>({
      url: endpoints.HOST + endpoints.CHALLENGE.GET_HOME_PAGE_CHALLENGES,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public getGlobal(filters: ChallengeFilters): Observable<Challenge[]> {
    const params: ChallengeFilters = {};

    if (filters?.levelId) {
      params['levelId'] = filters.levelId;
    }

    if (filters?.sportType) {
      params['sportType'] = filters.sportType;
    }

    return this.requestHelper.get<Challenge[]>({
      url: endpoints.HOST + endpoints.CHALLENGE.GET_GLOBAL_CHALLENGES,
      params,
      token$: this.sessionService.getSessionToken(),
    });
  }

  public getChallenge(id: string): Observable<Challenge> {
    return this.requestHelper.get<Challenge>({
      url: endpoints.HOST + endpoints.CHALLENGE.GET_CHALLENGE + id,
      token$: this.sessionService.getSessionToken(),
    });
  }
}
