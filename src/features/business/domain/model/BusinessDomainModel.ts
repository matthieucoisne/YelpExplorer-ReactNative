export interface BusinessDomainModel {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  address: string;
  price: string;
  categories: string[];
  // hours: Map<number, string[]>;
  // reviews: Review[];
}
