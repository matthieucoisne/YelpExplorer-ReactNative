import { UserRestModel } from './UserRestModel';

export interface ReviewListRestModel {
  reviews: ReviewRestModel[];
}

export interface ReviewRestModel {
  id: string;
  user: UserRestModel;
  text: string;
  rating: number;
  time_created: string;
}
