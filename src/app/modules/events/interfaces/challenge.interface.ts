import { SportType } from '../enums/sport.enum';
import { ChallengeType } from '../enums/challenge-type.enum';
import { ProfileBasicInfo, User } from '../../users/interfaces/user.interface';
import { ChallengeLevel as ChallengeLevelEnum } from '../enums/challenge-level.enum';
import { ParticipationStatus } from '../enums/challenge-participant.enum';
import { CurrencyType } from '../../../core/enums/currency-type.enum';

export interface Challenge {
  id: string;
  owner: ProfileBasicInfo;
  participants: ChallengeParticipant[];
  level: Level;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  challengeType: ChallengeType;
  sportType: SportType;
  deadline: Date;
  /**
   * Status related to this challenge for the user that made the http.
   * Required to change the enter button text and action.
   */
  participationStatus?: ParticipationStatus;
  sponsoredBy?: string;
  sponsorUrl?: string;
}

export interface ChallengeParticipant {
  id: string;
  user: ProfileBasicInfo;
  video: string;
  thumbnail: string;
  status: ParticipationStatus;
  createdAt: string;
}

export interface UserProfileChallenge {
  id: string;
  title: string;
  description: string;
  level: Level;
  sportType: SportType;
}

export interface Level {
  id: string;
  levelName: string;
  rewardMuscleCoins: number;
  requiredMuscleCoins: number;
  // to show on front-end
  text?: string;
}

export interface CreateChallengeParams {
  video: File;
  sportType: SportType;
  title: string;
  description: string;
  levelId: string;
}

export interface CreateSponsoredChallengeParams extends CreateChallengeParams {
  sponsoredBy: string;
  sponsorUrl: string;
  currencyType: CurrencyType;
}

export interface ChallengeLevel {
  levelName: ChallengeLevelEnum;
  rewardMuscleCoins: number;
  requiredMuscleCoins: number;
  id: string;
}

export type HomePageChallenges = {
  global: Challenge[];
  sponsored: Challenge[];
};
