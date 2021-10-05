import { Business } from '../../domain/model/Business';
import { Review } from '../../domain/model/Review';
import { User } from '../../domain/model/User';
import * as BusinessHelper from '../helper/BusinessHelper';
import { BusinessDetailsUiModel, ReviewUiModel, UserUiModel } from './BusinessDetailsUiModel';

export const toUiModel = (business: Business): BusinessDetailsUiModel => {
  const hours: string[][] = [];
  for (let i = 0; i < BusinessHelper.days.size; i++) {
    const day = BusinessHelper.days.get(i)!;
    const openList = business.hours.get(i) ?? [];
    if (openList.length > 0) {
      for (let j = 0; j < openList.length; j++) {
        hours.push([j == 0 ? day : '', openList[j]]);
      }
    } else {
      hours.push([day, 'Closed']); // TODO i18n
    }
  }

  return {
    id: business.id,
    name: business.name.toUpperCase(),
    photoUrl: business.photoUrl,
    ratingImage: BusinessHelper.getRatingImage(business.rating),
    reviewCount: `${business.reviewCount} reviews`,
    address: business.address,
    priceAndCategories: BusinessHelper.formatPriceAndCategories(business.price, business.categories),
    hours: hours,
    reviews: toReviewUiModels(business.reviews),
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
    photoUrl: user.photoUrl,
  };
};
