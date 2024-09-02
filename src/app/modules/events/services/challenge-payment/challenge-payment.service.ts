import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { ChallengePricing } from '../../interfaces/challenge-payment.interface';
import { Observable, take } from 'rxjs';
import { endpoints } from '../../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class ChallengePaymentService {
  constructor(
    private readonly httpHelper: HttpHelper,
    private readonly sessionService: SessionService
  ) {}

  public getSponsoredChallengePricing(): Observable<ChallengePricing> {
    return this.httpHelper.get<ChallengePricing>({
      url: endpoints.HOST + endpoints.CHALLENGE_PAYMENT.SPONSORED_PRICING,
      token$: this.sessionService.getSessionToken(),
    });
  }
}
