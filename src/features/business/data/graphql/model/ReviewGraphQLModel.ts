import {UserGraphQLModel} from './UserGraphQLModel';

export interface ReviewGraphQLModel {
  id: string;
  user: UserGraphQLModel;
  text: string;
  rating: number;
  time_created: string;
}
