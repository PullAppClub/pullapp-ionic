import { SportType } from '../enums/sport.enum';
import { ChallengeType } from '../enums/challenge-type.enum';
import { User } from '../../users/interfaces/user.interface';

export interface Challenge {
  id: string;
  user: User;
  participants: number;
  comments: number;
  level: Level;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  challengeType: ChallengeType;
  sportType: SportType;
  deadline: Date;
  createdAt: Date;
}

export interface Level {
  id: string;
  levelName: string;
  rewardMusclePoints: number;
  requiredMusclePoints: number;
  // to show on front-end
  text?: string;
}
