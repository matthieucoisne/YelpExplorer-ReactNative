import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { BusinessListGraphQLResponse, toDomainModels } from '../../data/graphql/model/BusinessGraphQLModel';
import { businessListQuery } from '../../data/graphql/query/BusinessListQuery';
import { BusinessDomainModel } from '../model/BusinessDomainModel';

export interface UseBusinessListQueryHook {
  businesses: BusinessDomainModel[];
  loading: boolean;
  error: ApolloError | undefined;
}

export const useBusinessListQuery = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
): UseBusinessListQueryHook => {
  const { data, loading, error } = useQuery<BusinessListGraphQLResponse>(businessListQuery, {
    variables: {
      term,
      location,
      sortBy,
      limit,
    },
  });

  const businesses: BusinessDomainModel[] = useMemo(() => {
    return toDomainModels(data?.search?.business ?? []);
  }, [data]);

  return { businesses, loading, error };
};
