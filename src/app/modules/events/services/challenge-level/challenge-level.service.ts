import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../../core/helpers/http/http-helper.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { ChallengeLevel } from '../../interfaces/challenge.interface';
import { endpoints } from '../../../../core/constants/endpoints.constant';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeLevelService {
  constructor(
    private readonly requestHelper: HttpHelper,
    private readonly sessionService: SessionService
  ) {}

  public getAll(): Observable<ChallengeLevel[]> {
    return this.requestHelper
      .get<ChallengeLevel[]>({
        url: endpoints.HOST + endpoints.CHALLENGE.LEVELS,
        token$: this.sessionService.getSessionToken(),
      })
      .pipe(take(1));
  }
}
