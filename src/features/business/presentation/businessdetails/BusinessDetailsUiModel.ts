export interface BusinessDetailsUiModel {
  id: string;
  name: string;
  imageUrl: string;
  ratingImage: any;
  reviewCount: string;
  address: string;
  priceAndCategories: string;
  // hours
  reviews: ReviewUiModel[];
}

export interface ReviewUiModel {
  id: string;
  user: UserUiModel;
  text: string;
  ratingImage: any;
  timeCreated: string;
}

export interface UserUiModel {
  name: string;
  imageUrl: string;
}
