import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('participantsSection', { static: true })
  private participantsSection!: ElementRef;

  constructor(
    public readonly tabBarService: TabBarService,
    public readonly dateHelper: DateHelper,
    public readonly sessionService: SessionService,
    private readonly elementRef: ElementRef,
    public readonly navigationHelper: NavigationHelper
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
}
