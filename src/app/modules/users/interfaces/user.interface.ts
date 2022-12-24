import { Challenge } from '../../events/interfaces/challenge.interface';
import { Meeting } from '../../events/interfaces/meeting.interface';

export interface User {
  id: string; // uuid
  avatar: string;
  username: string;
  birthday?: Date;
  height?: number;
  weight?: number;
  otherInfo?: string;
  musclePoints?: number;
  challenges?: Challenge[];
  meetings?: Meeting[];
  events?: (Challenge | Meeting)[];
}
