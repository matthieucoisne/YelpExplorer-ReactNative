import * as Constants from '../../../../../../core/Constants';
import {BusinessListRestModel, BusinessRestModel} from '../../model/BusinessRestModel';
import {ReviewListRestModel} from '../../model/ReviewRestModel';

export interface BusinessRestDataSource {
  getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<BusinessListRestModel>;
  getBusinessDetails(businessId: string): Promise<BusinessRestModel>;
  getBusinessReviews(businessId: string): Promise<ReviewListRestModel>;
}

export class BusinessRestDataSourceImpl implements BusinessRestDataSource {
  async getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<BusinessListRestModel> {
    return await fetch(
      `${Constants.URL_REST}/businesses/search?term=${term}&location=${location}&sortBy=${sortBy}&limit=${limit}`,
      {
        method: 'GET',
        headers: Constants.HEADERS,
      },
    ).then(response => response.json() as Promise<BusinessListRestModel>);
  }

  async getBusinessDetails(businessId: string): Promise<BusinessRestModel> {
    return await fetch(`${Constants.URL_REST}/businesses/${businessId}`, {
      method: 'GET',
      headers: Constants.HEADERS,
    }).then(response => response.json() as Promise<BusinessRestModel>);
  }

  async getBusinessReviews(businessId: string): Promise<ReviewListRestModel> {
    return await fetch(`${Constants.URL_REST}/businesses/${businessId}/reviews`, {
      method: 'GET',
      headers: Constants.HEADERS,
    }).then(response => response.json() as Promise<ReviewListRestModel>);
  }
}
