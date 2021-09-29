import { BusinessDomainModel } from '../../../domain/model/BusinessDomainModel';

export interface BusinessListGraphQLResponse {
  search: {
    business: BusinessGraphQLModel[];
  };
}

export interface BusinessDetailsGraphQLResponse {
  business: BusinessGraphQLModel;
}

export interface BusinessGraphQLModel {
  id: string;
  name: string;
  photos: string[];
  review_count: number;
  categories: CategoryGraphQLModel[];
  rating: number;
  price: string;
  location: LocationGraphQLModel;
  // hours: [];
  // reviews: [];
}

interface CategoryGraphQLModel {
  title: string;
}

interface LocationGraphQLModel {
  address1: string;
  city: string;
}

export const toDomainModels = (businessDataModels: BusinessGraphQLModel[]): BusinessDomainModel[] => {
  return businessDataModels.map((businessDataModel: BusinessGraphQLModel) => {
    return {
      id: businessDataModel.id,
      name: businessDataModel.name,
      imageUrl: businessDataModel.photos[0],
      reviewCount: businessDataModel.review_count,
      categories: businessDataModel.categories.map((category: CategoryGraphQLModel) => category.title),
      rating: businessDataModel.rating,
      price: businessDataModel.price ?? '',
      address: `${businessDataModel.location.address1}, ${businessDataModel.location.city}`,
      // hours:
    };
  });
};

export const toDomainModel = (businessDataModel: BusinessGraphQLModel): BusinessDomainModel => {
  return {
    id: businessDataModel.id,
    name: businessDataModel.name,
    imageUrl: businessDataModel.photos[0],
    reviewCount: businessDataModel.review_count,
    categories: businessDataModel.categories.map((category: CategoryGraphQLModel) => category.title),
    rating: businessDataModel.rating,
    price: businessDataModel.price ?? '',
    address: `${businessDataModel.location.address1}, ${businessDataModel.location.city}`,
    // hours:
  };
};
