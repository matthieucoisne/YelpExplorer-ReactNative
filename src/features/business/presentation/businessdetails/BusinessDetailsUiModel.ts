export interface BusinessDetailsUiModel {
  id: string;
  name: string;
  photoUrl: string;
  ratingImage: any;
  reviewCount: string;
  address: string;
  priceAndCategories: string;
  hours: string[][];
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
  photoUrl: string;
}
