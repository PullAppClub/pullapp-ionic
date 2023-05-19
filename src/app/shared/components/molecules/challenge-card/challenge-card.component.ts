import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

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

  public showVideoContainer: boolean = false;

  constructor(private readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  public toggleVideoContainer(): void {
    this.showVideoContainer = !this.showVideoContainer;
  }

  public openChallenge(): void {
    this.navigationHelper.openPage({
      route: '/events/challenge/' + this.challenge.id,
    });
  }
}
