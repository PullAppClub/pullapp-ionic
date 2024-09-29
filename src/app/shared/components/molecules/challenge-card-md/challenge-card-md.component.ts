import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';
import { ParticipationStatus } from '../../../../modules/events/enums/challenge-participant.enum';
import { SessionService } from '../../../../core/services/session/session.service';

@Component({
  selector: 'app-challenge-card-md',
  templateUrl: './challenge-card-md.component.html',
  styleUrls: ['./challenge-card-md.component.scss'],
})
export class ChallengeCardMdComponent implements OnInit {
  @Input()
  public challenge!: Challenge;

  public userId?: string;

  constructor(
    private readonly navigationHelper: NavigationHelper,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService
      .observeParsedSessionToken()
      .subscribe(value => (this.userId = value?.userId));
  }

  public openChallenge(): void {
    this.navigationHelper.openPage({
      route: '/events/challenge/' + this.challenge.id,
    });
  }

  public readonly participationStatus = ParticipationStatus;
}
