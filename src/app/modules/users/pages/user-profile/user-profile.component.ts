import { Component, OnInit, Renderer2 } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../../../../environments/environment';
import { CreateMapArgs } from '@capacitor/google-maps/dist/typings/implementation';
import { Challenge } from '../../../events/interfaces/challenge.interface';
import { SportType } from '../../../events/enums/sport.enum';
import { ChallengeType } from '../../../events/enums/challenge-type.enum';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public challenges: Challenge[] = [];

  constructor(public renderer: Renderer2) {
    // temp challenges
    this.challenges.push({
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
        'https://images.unsplash.com/photo-1589988020028-8e8b5b0b1b1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      video: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
      user: {} as User,
      level: {
        id: '1',
        levelName: 'Beginner',
        rewardMusclePoints: 10,
        requiredMusclePoints: 10,
      },
    });
  }

  async ngOnInit() {}
}
