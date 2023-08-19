import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../interfaces/challenge.interface';
import { SportType } from '../../enums/sport.enum';
import { ChallengeType } from '../../enums/challenge-type.enum';
import { User } from '../../../users/interfaces/user.interface';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
  @Input()
  public challenge?: Challenge;

  constructor() {}

  ngOnInit() {
    this.getChallenge();
  }

  public async getChallenge(): Promise<void> {
    try {
      if (!this.challenge) {
      }
    } catch (e) {
      console.log(e);
    }
  }
}
