import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';
import { NavigationHelper } from '../../../../core/helpers/navigation/navigation.helper';

@Component({
  selector: 'app-challenge-card-md',
  templateUrl: './challenge-card-md.component.html',
  styleUrls: ['./challenge-card-md.component.scss'],
})
export class ChallengeCardMdComponent implements OnInit {
  @Input()
  public challenge!: Challenge;
  constructor(private readonly navigationHelper: NavigationHelper) {}

  ngOnInit() {}

  public openChallenge(): void {
    this.navigationHelper.openPage({
      route: '/events/challenge/' + this.challenge.id,
    });
  }
}
