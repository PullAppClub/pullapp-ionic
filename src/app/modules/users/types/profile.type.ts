import { Gender } from '../../../core/enums/gender.enum';

export type UserProfile = {
  gender: Gender;
  birthday: Date;
  height: number;
  weight: number;
  avatar: string;
  username: string;
  muscleCoins: number;
  description?: string;
};

export type UpdateProfileInfoParams = Omit<
  UserProfile,
  'avatar' | 'username' | 'muscleCoins'
>;
