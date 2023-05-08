import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../modules/events/interfaces/challenge.interface';

@Component({
  selector: 'app-challenge-card-md',
  templateUrl: './challenge-card-md.component.html',
  styleUrls: ['./challenge-card-md.component.scss'],
})
export class ChallengeCardMdComponent implements OnInit {
  @Input()
  public challenge!: Challenge;
  constructor() {}

  ngOnInit() {}
}
