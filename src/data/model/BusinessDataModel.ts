import {BusinessDomainModel} from '../../domain/model/BusinessDomainModel';

export interface BusinessListResponse {
  search: {
    business: BusinessDataModel[];
  };
}

export interface BusinessDataModel {
  id: string;
  name: string;
  photos: string[];
}

export const toDomainModels = (businessDataModels: BusinessDataModel[]): BusinessDomainModel[] => {
  return businessDataModels.map((businessDataModel: BusinessDataModel) => {
    return {
      id: businessDataModel.id,
      name: businessDataModel.name,
      photo: businessDataModel.photos[0],
    };
  });
};
