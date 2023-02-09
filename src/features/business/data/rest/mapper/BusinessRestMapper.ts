import * as Helper from '../../../../../core/Helper';
import {Business} from '../../../domain/model/Business';
import {BusinessRestModel} from '../model/BusinessRestModel';

export const toDomainModels = (businesses: BusinessRestModel[]): Business[] => {
  return businesses.map(business => {
    return toDomainModel(business);
  });
};

export const toDomainModel = (business: BusinessRestModel): Business => {
  const categories: string[] = business.categories.map(category => {
    return category.title;
  });

  const hours = new Map<number, string[]>();
  if (business.hours && business.hours?.length > 0) {
    const openingHours = business.hours[0].open; // Regular hours are at index 0
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

  return {
    id: business.id,
    name: business.name,
    photoUrl: business.image_url,
    reviewCount: business.review_count,
    categories: categories,
    rating: business.rating,
    price: business.price ?? '',
    address: `${business.location.address1}, ${business.location.city}`,
    hours: hours,
    reviews: [],
  };
};
