import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';

@Component({
  selector: 'app-official-challenge-card',
  templateUrl: './official-challenge-card.component.html',
  styleUrls: ['./official-challenge-card.component.scss'],
})
export class OfficialChallengeCardComponent implements OnInit {
  @Input()
  public challenge!: Challenge;

  constructor() {}

  ngOnInit() {}
}
