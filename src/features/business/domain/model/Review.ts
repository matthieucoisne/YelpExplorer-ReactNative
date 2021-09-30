import { User } from './User';

export interface Review {
  id: string;
  user: User;
  text: string;
  rating: number;
  timeCreated: string;
}
