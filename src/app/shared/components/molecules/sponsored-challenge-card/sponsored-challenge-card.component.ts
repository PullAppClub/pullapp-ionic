import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { ChallengeService } from '../../../../modules/events/services/challenge/challenge.service';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-sponsored-challenge-card',
  templateUrl: './sponsored-challenge-card.component.html',
  styleUrls: ['./sponsored-challenge-card.component.scss'],
})
export class SponsoredChallengeCardComponent implements OnInit {
  @Input()
  public challenge!: Challenge;

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly navigationHelper: NavigationHelper
  ) {}

  ngOnInit() {}

  public openChallenge(): void {
    this.challengeService.setPassedChallenge(this.challenge);

    this.navigationHelper.openPage({
      route: '/events/challenge/' + this.challenge.id,
    });
  }
}
