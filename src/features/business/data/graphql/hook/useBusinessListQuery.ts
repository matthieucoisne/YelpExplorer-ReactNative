import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Business } from '../../../domain/model/Business';
import * as BusinessGraphQLMapper from '../mapper/BusinessGraphQLMapper';
import { BusinessListGraphQLModel } from '../model/BusinessGraphQLModel';
import { businessListQuery } from '../query/BusinessListQuery';

export interface UseBusinessListQueryHook {
  businesses: Business[];
  loading: boolean;
  error: ApolloError | undefined;
}

export const useBusinessListQuery = (
  term: string,
  location: string,
  sortBy: string,
  limit: number,
): UseBusinessListQueryHook => {
  const { data, loading, error } = useQuery<BusinessListGraphQLModel>(businessListQuery, {
    variables: {
      term,
      location,
      sortBy,
      limit,
    },
  });

  const businesses: Business[] = useMemo(() => {
    return BusinessGraphQLMapper.toDomainModels(data?.search?.business ?? []);
  }, [data]);

  return { businesses, loading, error };
};
