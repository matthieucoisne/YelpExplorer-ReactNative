import { Business } from '../../../domain/model/Business';
import { BusinessRepository } from '../../../domain/repository/BusinessRepository';
import { BusinessGraphQLDataSource } from '../datasource/remote/BusinessGraphQLDataSource';
import { toDomainModel, toDomainModels } from '../mapper/BusinessGraphQLMapper';

export class BusinessGraphQLRepository implements BusinessRepository {
  private remoteDataSource: BusinessGraphQLDataSource;

  constructor(remoteDataSource: BusinessGraphQLDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getBusinessList(term: string, location: string, sortBy: string, limit: number): Promise<Business[]> {
    const response = await this.remoteDataSource.getBusinessList(term, location, sortBy, limit);
    return toDomainModels(response.search.business);
  }

  async getBusinessDetailsWithReviews(businessId: string): Promise<Business> {
    const response = await this.remoteDataSource.getBusinessDetailsWithReviews(businessId);
    return toDomainModel(response.business);
  }
}
