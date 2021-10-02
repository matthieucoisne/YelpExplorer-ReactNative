import { Business } from '../../domain/model/Business';
import * as BusinessHelper from '../helper/BusinessHelper';
import { BusinessListUiModel } from './BusinessListUiModel';

export const toUiModels = (businesses: Business[]): BusinessListUiModel[] => {
  return businesses.map((business: Business, index: number) => {
    return {
      id: business.id,
      name: `${index + 1}. ${business.name.toUpperCase()}`,
      photoUrl: business.photoUrl,
      ratingImage: BusinessHelper.getRatingImage(business.rating),
      reviewCount: `${business.reviewCount} reviews`,
      address: business.address,
      priceAndCategories: BusinessHelper.formatPriceAndCategories(business.price, business.categories),
    };
  });
};
