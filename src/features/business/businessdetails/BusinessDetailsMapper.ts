import * as Constants from '../../../core/Constants';
import * as Helper from '../../../core/Helper';
import {BusinessGraphQLModel} from '../../../data/graphql/model/BusinessGraphQLModel';
import {ReviewGraphQLModel} from '../../../data/graphql/model/ReviewGraphQLModel';
import {UserGraphQLModel} from '../../../data/graphql/model/UserGraphQLModel';
import * as BusinessHelper from '../helper/BusinessHelper';
import {
  BusinessDetailsUiModel,
  ReviewUiModel,
  UserUiModel,
} from './BusinessDetailsUiModel';

export const toUiModel = (business: BusinessGraphQLModel): BusinessDetailsUiModel => {
  const categories: string[] = business.categories.map(category => {
    return category.title;
  });

  const businessHours = new Map<number, string[]>();
  if (business.hours && business.hours?.length > 0) {
    const openingHours = business.hours[0].open; // Only care about regular hours, index 0
    if (openingHours.length > 0) {
      const openingHoursPerDay = Helper.groupBy(openingHours, open => open.day);
      openingHoursPerDay.forEach((openList, day) => {
        businessHours.set(
          day,
          openList.map(open => {
            const start = `${open.start.substring(0, 2)}:${open.start.substring(2, 4)}`;
            const end = `${open.end.substring(0, 2)}:${open.end.substring(2, 4)}`;
            return `${start} - ${end}`;
          }),
        );
      });
    }
  }

  const hours: string[][] = [];
  for (let i = 0; i < Constants.DAYS.size; i++) {
    const day = Constants.DAYS.get(i)!;
    const openList = businessHours.get(i) ?? [];
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
    photoUrl: business.photos[0],
    ratingImage: BusinessHelper.getRatingImage(business.rating),
    reviewCount: `${business.review_count} reviews`,
    address: `${business.location.address1}, ${business.location.city}`,
    priceAndCategories: BusinessHelper.formatPriceAndCategories(
      business.price,
      categories,
    ),
    hours: hours,
    reviews: toReviewUiModels(business.reviews),
  };
};

const toReviewUiModels = (reviews: ReviewGraphQLModel[] | undefined): ReviewUiModel[] => {
  return (
    reviews?.map(review => {
      return {
        id: review.id,
        user: toUserUiModel(review.user),
        text: review.text,
        ratingImage: BusinessHelper.getRatingImage(review.rating),
        timeCreated: review.time_created.substring(0, 10),
      };
    }) ?? []
  );
};

const toUserUiModel = (user: UserGraphQLModel): UserUiModel => {
  return {
    name: user.name,
    photoUrl: user.image_url ?? '',
  };
};
