import { ReviewGraphQLModel } from './ReviewGraphQLModel';

export interface BusinessListGraphQLResponse {
  search: {
    business: BusinessGraphQLModel[];
  };
}

export interface BusinessDetailsGraphQLResponse {
  business: BusinessGraphQLModel;
}

export interface BusinessGraphQLModel {
  id: string;
  name: string;
  photos: string[];
  review_count: number;
  categories: CategoryGraphQLModel[];
  rating: number;
  price: string;
  location: LocationGraphQLModel;
  // hours: [];
  reviews?: ReviewGraphQLModel[];
}

interface CategoryGraphQLModel {
  title: string;
}

interface LocationGraphQLModel {
  address1: string;
  city: string;
}
