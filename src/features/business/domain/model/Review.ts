import { User } from './User';

export interface Review {
  user: User;
  text: string;
  rating: number;
  timeCreated: string;
}
