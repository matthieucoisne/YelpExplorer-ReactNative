import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  BusinessDetailsGraphQLResponse,
  BusinessListGraphQLResponse,
} from '../../model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../../query/BusinessDetailsQuery';
import { businessListQuery } from '../../query/BusinessListQuery';

export class BusinessGraphQLDataSource {
  private graphQLClient: ApolloClient<NormalizedCacheObject>;

  constructor(graphQLClient: ApolloClient<NormalizedCacheObject>) {
    this.graphQLClient = graphQLClient;
  }

  async getBusinessList(
    term: string,
    location: string,
    sortBy: string,
    limit: number,
  ): Promise<BusinessListGraphQLResponse> {
    return (
      await this.graphQLClient.query<BusinessListGraphQLResponse>({
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

  async getBusinessDetailsWithReviews(businessId: string): Promise<BusinessDetailsGraphQLResponse> {
    return (
      await this.graphQLClient.query<BusinessDetailsGraphQLResponse>({
        query: businessDetailsQuery,
        variables: {
          id: businessId,
        },
      })
    ).data;
  }
}
