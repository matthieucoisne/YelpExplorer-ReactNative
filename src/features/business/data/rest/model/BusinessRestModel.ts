import { ReviewRestModel } from './ReviewRestModel';

export interface BusinessListRestModel {
  businesses: BusinessRestModel[];
}

export interface BusinessRestModel {
  id: string;
  name: string;
  image_url: string;
  review_count: number;
  categories: CategoryRestModel[];
  rating: number;
  price: string;
  location: LocationRestModel;
  hours?: HourRestModel[];
  reviews?: ReviewRestModel[];
}

interface CategoryRestModel {
  title: string;
}

interface LocationRestModel {
  address1: string;
  city: string;
}

interface HourRestModel {
  open: OpenRestModel[];
}

interface OpenRestModel {
  start: string;
  end: string;
  day: number;
}
