import {Business} from '../../../domain/model/Business';
import {BusinessRepository} from '../../../domain/repository/BusinessRepository';
import {BusinessRestDataSource} from '../datasource/remote/BusinessRestDataSource';
import * as BusinessMapper from '../mapper/BusinessRestMapper';
import * as ReviewMapper from '../mapper/ReviewRestMapper';

export class BusinessRestRepository implements BusinessRepository {
  private remoteDataSource: BusinessRestDataSource;

  constructor(remoteDataSource: BusinessRestDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<Business[]> {
    const response = await this.remoteDataSource.getBusinessList(
      term,
      location,
      sortBy,
      limit,
    );
    return BusinessMapper.toDomainModels(response.businesses);
  }

  async getBusinessDetailsWithReviews(businessId: string): Promise<Business> {
    const promiseBusinessRestModel = this.remoteDataSource.getBusinessDetails(businessId);
    const promiseReviewListRestModel =
      this.remoteDataSource.getBusinessReviews(businessId);

    const businessRestModel = await promiseBusinessRestModel;
    const reviewListRestModel = await promiseReviewListRestModel;

    const business = BusinessMapper.toDomainModel(businessRestModel);
    const reviews = ReviewMapper.toDomainModels(reviewListRestModel.reviews);

    return {...business, reviews: reviews};
  }
}
