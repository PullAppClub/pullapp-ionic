import { Gender } from '../../../core/enums/gender.enum';

export type UpdateProfileInfoParams = {
  gender: Gender;
  birthday: Date;
  height: number;
  weight: number;
};
