import { Business } from '../../../domain/model/Business';
import { Review } from '../../../domain/model/Review';
import { BusinessGraphQLModel } from '../model/BusinessGraphQLModel';

export const toDomainModels = (businesses: BusinessGraphQLModel[]): Business[] => {
  return businesses.map(business => {
    return toDomainModel(business);
  });
};

export const toDomainModel = (business: BusinessGraphQLModel): Business => {
  const categories: string[] = business.categories.map(category => {
    return category.title;
  });

  const reviews: Review[] | undefined = business.reviews?.map(review => {
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
  });

  return {
    id: business.id,
    name: business.name,
    photoUrl: business.photos[0],
    reviewCount: business.review_count,
    categories: categories,
    rating: business.rating,
    price: business.price ?? '',
    address: `${business.location.address1}, ${business.location.city}`,
    // hours:
    reviews: reviews ?? [],
  };
};
