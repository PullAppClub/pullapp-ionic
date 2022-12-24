import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../modules/events/interfaces/challenge.interface';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
})
export class ChallengeCardComponent implements OnInit {
  @Input()
  public challenge: Challenge | undefined;

  constructor() {}

  ngOnInit() {}
}
