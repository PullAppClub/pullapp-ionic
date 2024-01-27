import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Challenge } from '../../interfaces/challenge.interface';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { ChallengeParticipantsListModalComponent } from '../../../../shared/components/molecules/challenge-participants-list-modal/challenge-participants-list-modal.component';
import { SessionService } from '../../../../core/services/session/session.service';
import { LangService } from '../../../../core/services/lang/lang.service';
import { ParticipationStatus } from '../../enums/challenge-participant.enum';
import { ChallengeParticipationService } from '../../services/challenge-participation/challenge-participation.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { mergeMap, take } from 'rxjs';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  public challenge?: Challenge;
  public modal = ChallengeParticipantsListModalComponent;
  public userId: string | undefined;
  public videoPlayerLabelId = 'videoPlayerLabelIdChallengeComponent';
  public loadParticipationModal = false;
  public readonly participationStatus = ParticipationStatus;
  private participationVideo?: File;
  /**
   * @see {@link src/app/shared/components/molecules/warning-modal/warning-modal.component.ts} to see how the id is used.
   */
  @ViewChild('openModalBtn', { read: ElementRef })
  public openModalBtn!: ElementRef;

  @ViewChild('cancelModalBtn', { read: ElementRef })
  public cancelModalBtn!: ElementRef;

  public warningLabelId = 'warningModalIdChallengeComponent';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly challengeService: ChallengeService,
    private readonly sessionService: SessionService,
    private readonly langService: LangService,
    private readonly toastService: ToastService,
    private readonly challengeParticipationService: ChallengeParticipationService
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

  public showParticipationModal(): void {
    this.loadParticipationModal = true;
  }

  public createChallengeParticipant(): void {
    if (!this.participationVideo) {
      return;
    }

    this.cancelModalBtn.nativeElement.click();
    this.openModalBtn.nativeElement.click();

    this.challengeParticipationService
      .createChallengeParticipation({
        challengeId: this.challenge?.id as string,
        video: this.participationVideo,
      })
      .pipe(mergeMap(({ message }) => this.langService.t(message)))
      .subscribe(message => this.toastService.showSuccessToast({ message }));
  }

  public setParticipationVideo(video: File): void {
    this.participationVideo = video;
  }
}
