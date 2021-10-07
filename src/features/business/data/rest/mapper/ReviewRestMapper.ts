import { Review } from '../../../domain/model/Review';
import { User } from '../../../domain/model/User';
import { ReviewRestModel } from '../model/ReviewRestModel';

export const toDomainModels = (reviews: ReviewRestModel[]): Review[] => {
  return reviews.map(review => {
    return toDomainModel(review);
  });
};

export const toDomainModel = (review: ReviewRestModel): Review => {
  const user: User = {
    name: review.user.name,
    photoUrl: review.user.image_url ?? '',
  };

  return {
    id: review.id,
    user: user,
    text: review.text,
    rating: review.rating,
    timeCreated: review.time_created.substring(0, 10),
  };
};
