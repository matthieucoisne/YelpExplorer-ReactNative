import {ReviewGraphQLModel} from './ReviewGraphQLModel';

export interface BusinessListGraphQLModel {
  search: {
    business: BusinessGraphQLModel[];
  };
}

export interface BusinessDetailsGraphQLModel {
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
  hours?: HourGraphQLModel[];
  reviews?: ReviewGraphQLModel[];
}

interface CategoryGraphQLModel {
  title: string;
}

interface LocationGraphQLModel {
  address1: string;
  city: string;
}

interface HourGraphQLModel {
  open: OpenGraphQLModel[];
}

interface OpenGraphQLModel {
  start: string;
  end: string;
  day: number;
}
