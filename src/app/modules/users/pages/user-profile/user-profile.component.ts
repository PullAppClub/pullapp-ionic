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
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { UserProfile } from '../../types/profile.type';
import { HttpErrorHandlerHelper } from '../../../../core/helpers/http-error-handler/http-error-handler.helper';

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
  public profile?: UserProfile;

  constructor(
    public readonly tabBarService: TabBarService,
    private readonly userProfileService: UserProfileService,
    private readonly httpErrorHandlerHelper: HttpErrorHandlerHelper
  ) {
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

  ngOnInit() {
    this.loadProfile();
  }

  private async loadProfile(): Promise<void> {
    try {
      this.profile = await this.userProfileService.getProfile();
    } catch (e) {
      this.httpErrorHandlerHelper.handle(e);
    }
  }
}
