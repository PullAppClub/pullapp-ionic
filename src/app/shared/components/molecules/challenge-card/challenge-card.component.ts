import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';

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

  constructor() {}

  ngOnInit() {}

  public toggleVideoContainer(): void {
    this.showVideoContainer = !this.showVideoContainer;
  }
}
