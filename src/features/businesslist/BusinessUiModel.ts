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
  return businesses.map((businessDomainModel: BusinessDomainModel, index: number) => {
    return {
      id: businessDomainModel.id,
      name: `${index + 1}. ${businessDomainModel.name.toUpperCase()}`,
      imageUrl: businessDomainModel.imageUrl,
      ratingImage: BusinessHelper.getRatingImage(businessDomainModel.rating),
      reviewCount: `${businessDomainModel.reviewCount} reviews`,
      address: businessDomainModel.address,
      priceAndCategories: BusinessHelper.formatPriceAndCategories(
        businessDomainModel.price,
        businessDomainModel.categories,
      ),
    };
  });
};
