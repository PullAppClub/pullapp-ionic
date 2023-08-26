import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeParticipant,
} from '../../interfaces/challenge.interface';
import {
  ProfileBasicInfo,
  User,
} from '../../../users/interfaces/user.interface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';
import { ChallengeParticipantsListModalComponent } from '../../../../shared/components/molecules/challenge-participants-list-modal/challenge-participants-list-modal.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  public challenge?: Challenge;
  public modal = ChallengeParticipantsListModalComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly challengeService: ChallengeService,
    private readonly errorHttpHandlerHelper: HttpErrorHandlerHelper
  ) {}

  ngOnInit() {
    this.getChallenge();
  }

  public async getChallenge(): Promise<void> {
    try {
      this.challenge = this.challengeService.getPassedChallenge();

      if (!this.challenge) {
        this.challenge = await this.challengeService.getChallenge(
          this.getChallengeIdFromPath()
        );
      }
    } catch (e) {
      this.errorHttpHandlerHelper.handle(e);
    }
  }

  private getChallengeIdFromPath(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
