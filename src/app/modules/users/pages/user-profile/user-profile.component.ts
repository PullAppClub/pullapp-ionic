import { Component, OnInit } from '@angular/core';
import {
  Challenge,
  UserProfileChallenge,
} from '../../../events/interfaces/challenge.interface';
import { SportType } from '../../../events/enums/sport.enum';
import { ChallengeType } from '../../../events/enums/challenge-type.enum';
import { User } from '../../interfaces/user.interface';
import { TabBarService } from '../../../../core/services/tab-bar/tab-bar.service';
import { UserChallengesSection } from '../../enums/layout.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public challenges: Challenge[] = [];
  public activeChallenges: UserProfileChallenge[] = [];
  public completedChallenges: UserProfileChallenge[] = [];
  public showChallenges: UserChallengesSection = UserChallengesSection.Active;
  public userChallengesSection = UserChallengesSection;
  public spots = [];

  constructor(public readonly tabBarService: TabBarService) {
    // temp challenges
    this.challenges.push(
      {
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
      },
      {
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
      }
    );

    this.mockEvents();
  }

  public async loadMoreActiveChallenges(): Promise<void> {
    try {
    } catch (e) {}
  }

  public async loadMoreCompletedChallenges(): Promise<void> {
    try {
    } catch (e) {}
  }

  public showChallengeSection(section: string): void {
    this.showChallenges = section as UserChallengesSection;
  }

  private mockEvents(): void {
    this.activeChallenges = [
      {
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        id: '1',
        level: {
          levelName: 'Beginner',
        } as any,
        sportType: SportType.Calisthenics,
      },
      {
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        id: '1',
        level: {
          levelName: 'Beginner',
        } as any,
        sportType: SportType.Calisthenics,
      },
      {
        sportType: SportType.Calisthenics,
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        id: '1',
        level: {
          levelName: 'Beginner',
        } as any,
      },
    ];

    this.completedChallenges = [
      {
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        id: '1',
        level: {
          levelName: 'Beginner',
        } as any,
        sportType: SportType.Calisthenics,
      },
      {
        title: 'Challenge 1',
        description: 'Challenge 1 description',
        id: '1',
        level: {
          levelName: 'Beginner',
        } as any,
        sportType: SportType.Calisthenics,
      },
    ];
  }

  async ngOnInit() {}
}
