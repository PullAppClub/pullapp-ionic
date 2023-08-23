import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../interfaces/challenge.interface';
import { SportType } from '../../enums/sport.enum';
import { ChallengeType } from '../../enums/challenge-type.enum';
import { User } from '../../../users/interfaces/user.interface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  public challenge?: Challenge;

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
