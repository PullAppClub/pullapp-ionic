import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { SessionService } from '../../../../core/services/session/session.service';
import { ChallengeService } from '../../../../modules/events/services/challenge/challenge.service';
import { ParticipationStatus } from '../../../../modules/events/enums/challenge-participant.enum';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input()
  public challenge!: Challenge;

  @Input()
  public cardClass!: string;
  public participationStatus = ParticipationStatus;

  public showVideoContainer: boolean = false;
  public videoPlayerLabelId = 'videoPlayerLabelId';
  public userId: string | null = null;

  constructor(
    private readonly navigationHelper: NavigationHelper,
    private readonly sessionService: SessionService,
    private readonly challengeService: ChallengeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = (await this.sessionService.getParsedSessionToken()).uid;
  }

  public toggleVideoContainer(): void {
    this.showVideoContainer = !this.showVideoContainer;
  }

  public openChallenge(): void {
    this.challengeService.setPassedChallenge(this.challenge);

    this.navigationHelper.openPage({
      route: '/events/challenge/' + this.challenge.id,
    });
  }
}
