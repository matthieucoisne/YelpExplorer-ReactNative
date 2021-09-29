import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';
import * as BusinessHelper from '../helper/BusinessHelper';

export interface BusinessDetailsUiModel {
  id: string;
  name: string;
  imageUrl: string;
  ratingImage: any;
  reviewCount: string;
  address: string;
  priceAndCategories: string;
}

export const toUiModel = (business: BusinessDomainModel): BusinessDetailsUiModel => {
  return {
    id: business.id,
    name: business.name.toUpperCase(),
    imageUrl: business.imageUrl,
    ratingImage: BusinessHelper.getRatingImage(business.rating),
    reviewCount: `${business.reviewCount} reviews`,
    address: business.address,
    priceAndCategories: BusinessHelper.formatPriceAndCategories(business.price, business.categories),
  };
};
