import {Review} from './Review';

export interface Business {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  address: string;
  price: string;
  categories: string[];
  hours: Map<number, string[]>;
  reviews: Review[];
}
