import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { toDomainModels } from '../../data/graphql/mapper/BusinessGraphQLMapper';
import { BusinessListGraphQLResponse } from '../../data/graphql/model/BusinessGraphQLModel';
import { businessListQuery } from '../../data/graphql/query/BusinessListQuery';
import { Business } from '../model/Business';

export interface UseBusinessListQueryHook {
  businesses: Business[];
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

  const businesses: Business[] = useMemo(() => {
    return toDomainModels(data?.search?.business ?? []);
  }, [data]);

  return { businesses, loading, error };
};
