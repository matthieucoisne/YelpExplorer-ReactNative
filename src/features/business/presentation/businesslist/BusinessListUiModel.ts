import { Business } from '../../domain/model/Business';
import * as BusinessHelper from '../helper/BusinessHelper';

export interface BusinessListUiModel {
  id: string;
  name: string;
  imageUrl: string;
  ratingImage: any;
  reviewCount: string;
  address: string;
  priceAndCategories: string;
}

export const toUiModels = (businesses: Business[]): BusinessListUiModel[] => {
  return businesses.map((business: Business, index: number) => {
    return {
      id: business.id,
      name: `${index + 1}. ${business.name.toUpperCase()}`,
      imageUrl: business.imageUrl,
      ratingImage: BusinessHelper.getRatingImage(business.rating),
      reviewCount: `${business.reviewCount} reviews`,
      address: business.address,
      priceAndCategories: BusinessHelper.formatPriceAndCategories(business.price, business.categories),
    };
  });
};
