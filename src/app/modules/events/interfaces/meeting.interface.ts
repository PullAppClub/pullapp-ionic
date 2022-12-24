import { User } from '../../users/interfaces/user.interface';

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: Date;
  user: User;
  participants: string[];
  comments: number;
  createdAt: Date;
}
