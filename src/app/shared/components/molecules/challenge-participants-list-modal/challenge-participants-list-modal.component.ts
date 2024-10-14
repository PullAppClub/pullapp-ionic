import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeParticipant,
} from '../../../../modules/events/interfaces/challenge.interface';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';
import { DateHelper } from '../../../../core/helpers/date/date.helper';
import { ParticipationStatus } from '../../../../modules/events/enums/challenge-participant.enum';
import { SessionService } from '../../../../core/services/session/session.service';
import { DecodedToken } from '../../../../core/types/auth.type';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChallengeParticipationService } from '../../../../modules/events/services/challenge-participation/challenge-participation.service';
import { finalize } from 'rxjs';
import { error } from 'ol/console';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

@Component({
  selector: 'app-challenge-participants-list-modal',
  templateUrl: './challenge-participants-list-modal.component.html',
  styleUrls: ['./challenge-participants-list-modal.component.scss'],
})
export class ChallengeParticipantsListModalComponent implements OnInit {
  @Input({ required: true })
  public challenge!: Challenge;

  public participants: ChallengeParticipant[] = [];

  @Input({ required: true })
  public forLabelId!: string;
  public participationStatus = ParticipationStatus;
  public userId: string | undefined;

  public showDeclineChallengeSection = false;
  public showAcceptChallengeSection = false;
  public declineChallengeReasonForm = new FormGroup({
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
  });

  constructor(
    public readonly tabBarService: TabBarService,
    public readonly dateHelper: DateHelper,
    public readonly sessionService: SessionService,
    private readonly elementRef: ElementRef,
    public readonly navigationHelper: NavigationHelper,
    public readonly challengeParticipationService: ChallengeParticipationService,
    public readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {}

  ngOnInit(): void {
    this.participants = this.challenge.participants;
    this.sessionService
      .getParsedSessionToken()
      .subscribe((session: DecodedToken) => {
        this.userId = session.userId;
      });
  }

  public onClose(): void {
    this.tabBarService.setShowTabBar(true);

    const videoTags = this.elementRef.nativeElement.querySelectorAll('video');
    videoTags.forEach((videoTag: HTMLVideoElement): void => {
      videoTag.currentTime = 0;
      videoTag.pause();
    });
  }

  public createAgoString(createdAt: string): string {
    return this.dateHelper.getDistanceBetweenDates(
      new Date(createdAt),
      new Date()
    );
  }

  public showDeclineChallenge(): void {
    this.showDeclineChallengeSection = true;
    this.showAcceptChallengeSection = false;
  }

  public showAcceptChallenge(): void {
    this.showAcceptChallengeSection = true;
    this.showDeclineChallengeSection = false;
  }

  public declineChallenge(
    participation: ChallengeParticipant,
    reason: string
  ): void {
    this.challengeParticipationService
      .rejectChallengeParticipation(participation.id, reason)
      .pipe(finalize(() => (this.showDeclineChallengeSection = false)))
      .subscribe({
        next: () => (participation.status = ParticipationStatus.Decline),
        error: e => this.httpErrorHandlerHelper.handle(e),
      });
  }
}
