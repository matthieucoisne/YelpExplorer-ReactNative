import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import * as BusinessGraphQLMapper from '../../data/graphql/mapper/BusinessGraphQLMapper';
import { BusinessDetailsGraphQLResponse } from '../../data/graphql/model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../../data/graphql/query/BusinessDetailsQuery';
import { Business } from '../model/Business';

export interface UseBusinessDetailsQueryHook {
  business: Business | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useBusinessDetailsQuery = (businessId: String): UseBusinessDetailsQueryHook => {
  const { data, loading, error } = useQuery<BusinessDetailsGraphQLResponse>(businessDetailsQuery, {
    variables: {
      id: businessId,
    },
  });

  const business = useMemo(() => {
    return data ? BusinessGraphQLMapper.toDomainModel(data.business) : undefined;
  }, [data]);

  return { business, loading, error };
};
