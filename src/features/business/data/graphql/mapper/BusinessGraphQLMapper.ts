import * as Helper from '../../../../../core/Helper';
import {Business} from '../../../domain/model/Business';
import {Review} from '../../../domain/model/Review';
import {BusinessGraphQLModel} from '../model/BusinessGraphQLModel';

export const toDomainModels = (businesses: BusinessGraphQLModel[]): Business[] => {
  return businesses.map(business => {
    return toDomainModel(business);
  });
};

export const toDomainModel = (business: BusinessGraphQLModel): Business => {
  const categories: string[] = business.categories.map(category => {
    return category.title;
  });

  const hours = new Map<number, string[]>();
  if (business.hours && business.hours?.length > 0) {
    const openingHours = business.hours[0].open; // Only care about regular hours, index 0
    if (openingHours.length > 0) {
      const openingHoursPerDay = Helper.groupBy(openingHours, open => open.day);
      openingHoursPerDay.forEach((openList, day) => {
        hours.set(
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

  const reviews: Review[] =
    business.reviews?.map(review => {
      return {
        id: review.id,
        user: {
          name: review.user.name,
          photoUrl: review.user.image_url ?? '',
        },
        text: review.text,
        rating: review.rating,
        timeCreated: review.time_created.substring(0, 10),
      };
    }) ?? [];

  return {
    id: business.id,
    name: business.name,
    photoUrl: business.photos[0],
    reviewCount: business.review_count,
    categories: categories,
    rating: business.rating,
    price: business.price ?? '',
    address: `${business.location.address1}, ${business.location.city}`,
    hours: hours,
    reviews: reviews,
  };
};
