import { Gender } from '../../../core/enums/gender.enum';
import { Challenge } from '../../events/interfaces/challenge.interface';

export type UserProfile = {
  gender: Gender;
  birthday: Date;
  height: number;
  weight: number;
  avatar: string;
  username: string;
  muscleCoins: number;
  description?: string;
  rank?: number;
};

export type UpdateProfileInfoParams = Omit<
  UserProfile,
  'avatar' | 'username' | 'muscleCoins'
>;

export type ProfileEvents = {
  challenges: {
    active: Challenge[];
    completed: Challenge[];
    created: Challenge[];
  };
  spots: [];
  meetings: [];
};
