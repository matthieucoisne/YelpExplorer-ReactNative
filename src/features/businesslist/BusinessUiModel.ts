import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';
import * as BusinessHelper from '../helper/BusinessHelper';

export interface BusinessUiModel {
  id: string;
  name: string;
  imageUrl: string;
  ratingImage: any;
  reviewCount: string;
  address: string;
  priceAndCategories: string;
}

export const toUiModels = (businesses: BusinessDomainModel[]): BusinessUiModel[] => {
  return businesses.map((business: BusinessDomainModel, index: number) => {
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
