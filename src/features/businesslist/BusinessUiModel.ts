import { BusinessDomainModel } from '../../domain/model/BusinessDomainModel';

export interface BusinessUiModel {
  id: string;
  name: string;
  photo: string;
}

export const toUiModels = (businesses: BusinessDomainModel[]): BusinessUiModel[] => {
  return businesses.map((businessDomainModel: BusinessDomainModel) => {
    return {
      id: businessDomainModel.id,
      name: businessDomainModel.name,
      photo: businessDomainModel.photo,
    };
  });
};
