import { Business } from '../../domain/model/Business';
import { Review } from '../../domain/model/Review';
import { User } from '../../domain/model/User';
import * as BusinessHelper from '../helper/BusinessHelper';

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

export const toUiModel = (business: Business): BusinessDetailsUiModel => {
  return {
    id: business.id,
    name: business.name.toUpperCase(),
    imageUrl: business.imageUrl,
    ratingImage: BusinessHelper.getRatingImage(business.rating),
    reviewCount: `${business.reviewCount} reviews`,
    address: business.address,
    priceAndCategories: BusinessHelper.formatPriceAndCategories(business.price, business.categories),
    //
    reviews: toReviewUiModels(business.reviews!),
  };
};

const toReviewUiModels = (reviews: Review[]): ReviewUiModel[] => {
  return reviews.map(review => {
    return {
      id: review.id,
      user: toUserUiModel(review.user),
      text: review.text,
      ratingImage: BusinessHelper.getRatingImage(review.rating),
      timeCreated: review.timeCreated,
    };
  });
};

const toUserUiModel = (user: User): UserUiModel => {
  return {
    name: user.name,
    imageUrl: user.imageUrl,
  };
};
