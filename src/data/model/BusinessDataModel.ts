import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';

export interface BusinessListResponse {
  search: SearchDataModel;
}

interface SearchDataModel {
  business: BusinessDataModel[];
}

export interface BusinessDataModel {
  id: string;
  name: string;
  photos: string[];
  review_count: number;
  categories: CategoryDataModel[];
  rating: number;
  price: string;
  location: LocationDataModel;
  // hours: [];
  // reviews: [];
}

interface CategoryDataModel {
  title: string;
}

interface LocationDataModel {
  address1: string;
  city: string;
}

export const toDomainModels = (businessDataModels: BusinessDataModel[]): BusinessDomainModel[] => {
  return businessDataModels.map((businessDataModel: BusinessDataModel) => {
    return {
      id: businessDataModel.id,
      name: businessDataModel.name,
      imageUrl: businessDataModel.photos[0],
      reviewCount: businessDataModel.review_count,
      categories: businessDataModel.categories.map((category: CategoryDataModel) => category.title),
      rating: businessDataModel.rating,
      price: businessDataModel.price ?? '',
      address: `${businessDataModel.location.address1}, ${businessDataModel.location.city}`,
      // hours:
    };
  });
};
