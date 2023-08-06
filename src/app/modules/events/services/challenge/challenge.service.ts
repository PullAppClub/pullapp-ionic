import { Injectable } from '@angular/core';
import { RequestHelper } from '../../../../core/helpers/request/request.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { CreateChallengeParams } from '../../interfaces/challenge.interface';
import { HttpMessageResponse } from '../../../../core/interfaces/http-request.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';
import { LangService } from '../../../../core/services/lang/lang.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(
    private readonly requestHelper: RequestHelper,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly langService: LangService
  ) {}

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
}
