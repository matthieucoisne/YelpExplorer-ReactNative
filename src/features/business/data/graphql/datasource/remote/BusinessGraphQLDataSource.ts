import {ApolloClient, NormalizedCacheObject} from '@apollo/client';
import {
  BusinessDetailsGraphQLModel,
  BusinessListGraphQLModel,
} from '../../model/BusinessGraphQLModel';
import {businessDetailsQuery} from '../../query/BusinessDetailsQuery';
import {businessListQuery} from '../../query/BusinessListQuery';

export interface BusinessGraphQLDataSource {
  getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<BusinessListGraphQLModel>;
  getBusinessDetailsWithReviews(businessId: string): Promise<BusinessDetailsGraphQLModel>;
}

export class BusinessGraphQLDataSourceImpl implements BusinessGraphQLDataSource {
  private graphQLClient: ApolloClient<NormalizedCacheObject>;

  constructor(graphQLClient: ApolloClient<NormalizedCacheObject>) {
    this.graphQLClient = graphQLClient;
  }

  async getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<BusinessListGraphQLModel> {
    return (
      await this.graphQLClient.query<BusinessListGraphQLModel>({
        query: businessListQuery,
        variables: {
          term,
          location,
          sortBy,
          limit,
        },
      })
    ).data;
  }

  async getBusinessDetailsWithReviews(
    businessId: string,
  ): Promise<BusinessDetailsGraphQLModel> {
    return (
      await this.graphQLClient.query<BusinessDetailsGraphQLModel>({
        query: businessDetailsQuery,
        variables: {
          id: businessId,
        },
      })
    ).data;
  }
}
