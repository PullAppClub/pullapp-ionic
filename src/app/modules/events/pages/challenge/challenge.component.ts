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
        this.challenge = {
          id: '1',
          title: 'Challenge 1',
          description: 'Challenge 1 description',
          participants: 4,
          sportType: SportType.Skating,
          challengeType: ChallengeType.Global,
          comments: 2,
          deadline: new Date(),
          createdAt: new Date(),
          thumbnail:
            'https://img.welt.de/img/regionales/nrw/mobile148426359/4102501097-ci102l-w1024/Man-training-in-crossfit-center.jpg',
          video: 'https://www.w3schools.com/tags/movie.mp4',
          user: {} as User,
          level: {
            id: '1',
            levelName: 'Beginner',
            rewardMusclePoints: 10,
            requiredMusclePoints: 10,
          },
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
}
