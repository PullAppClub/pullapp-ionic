import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeParticipant,
} from '../../../../modules/events/interfaces/challenge.interface';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';
import { DateHelper } from '../../../../core/helpers/date/date.helper';
import { ParticipationStatus } from '../../../../modules/events/enums/challenge-participant.enum';
import { SessionService } from '../../../../core/services/session/session.service';

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

  constructor(
    public readonly tabBarService: TabBarService,
    public readonly dateHelper: DateHelper,
    public readonly sessionService: SessionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.participants = this.challenge.participants;
    this.userId = (await this.sessionService.getParsedSessionToken()).userId;
  }

  public createAgoString(createdAt: string): string {
    return this.dateHelper.getDistanceBetweenDates(
      new Date(createdAt),
      new Date()
    );
  }
}
