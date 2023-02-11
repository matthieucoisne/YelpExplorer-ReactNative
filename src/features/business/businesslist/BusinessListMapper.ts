import {BusinessGraphQLModel} from '../../../data/graphql/model/BusinessGraphQLModel';
import * as BusinessHelper from '../helper/BusinessHelper';
import {BusinessListUiModel} from './BusinessListUiModel';

export const toUiModels = (businesses: BusinessGraphQLModel[]): BusinessListUiModel => {
  return businesses.map((business: BusinessGraphQLModel, index: number) => {
    const categories: string[] = business.categories.map(category => {
      return category.title;
    });

    return {
      id: business.id,
      name: `${index + 1}. ${business.name.toUpperCase()}`,
      photoUrl: business.photos[0],
      ratingImage: BusinessHelper.getRatingImage(business.rating),
      reviewCount: `${business.review_count} reviews`, // TODO i18n
      address: `${business.location.address1}, ${business.location.city}`,
      priceAndCategories: BusinessHelper.formatPriceAndCategories(
        business.price ?? '',
        categories,
      ),
    };
  });
};
