import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../interfaces/challenge.interface';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { ChallengeParticipantsListModalComponent } from '../../../../shared/components/molecules/challenge-participants-list-modal/challenge-participants-list-modal.component';
import { SessionService } from '../../../../core/services/session/session.service';
import { LangService } from '../../../../core/services/lang/lang.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  public challenge?: Challenge;
  public modal = ChallengeParticipantsListModalComponent;
  public userId: string | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly challengeService: ChallengeService,
    private readonly sessionService: SessionService,
    private readonly langService: LangService
  ) {
    this.sessionService
      .observeParsedSessionToken()
      .subscribe(value => (this.userId = value?.userId));
  }

  ngOnInit(): void {
    this.getChallenge();
  }

  public getChallenge(): void {
    this.challenge = this.challengeService.getPassedChallenge();

    if (!this.challenge) {
      this.challengeService
        .getChallenge(this.getChallengeIdFromPath())
        .subscribe({
          next: (challenge: Challenge) => (this.challenge = challenge),
        });
    }
  }

  private getChallengeIdFromPath(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
