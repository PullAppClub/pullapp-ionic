import { SportType } from '../enums/sport.enum';
import { ChallengeType } from '../enums/challenge-type.enum';
import { ProfileBasicInfo, User } from '../../users/interfaces/user.interface';
import { ChallengeLevel as ChallengeLevelEnum } from '../enums/challenge-level.enum';
import { ParticipationStatus } from '../enums/challenge-participant.enum';

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
}

export interface ChallengeParticipant {
  id: string;
  user: ProfileBasicInfo;
  video: string;
  thumbnail: string;
  status: ParticipationStatus;
  createdAt: Date;
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
  rewardMusclePoints: number;
  requiredMusclePoints: number;
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

export interface ChallengeLevel {
  levelName: ChallengeLevelEnum;
  rewardMusclePoints: number;
  requiredMusclePoints: number;
  id: string;
}
