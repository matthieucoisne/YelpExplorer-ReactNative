import { UserGraphQLModel } from './UserGraphQLModel';

export interface ReviewGraphQLModel {
  user: UserGraphQLModel;
  text: string;
  rating: number;
  time_created: string;
}
