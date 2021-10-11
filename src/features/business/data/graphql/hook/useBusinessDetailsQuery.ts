import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Business } from '../../../domain/model/Business';
import * as BusinessGraphQLMapper from '../mapper/BusinessGraphQLMapper';
import { BusinessDetailsGraphQLModel } from '../model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../query/BusinessDetailsQuery';

export interface UseBusinessDetailsQueryHook {
  business: Business | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useBusinessDetailsQuery = (businessId: string): UseBusinessDetailsQueryHook => {
  const { data, loading, error } = useQuery<BusinessDetailsGraphQLModel>(businessDetailsQuery, {
    variables: {
      id: businessId,
    },
  });

  const business = useMemo(() => {
    return data ? BusinessGraphQLMapper.toDomainModel(data.business) : undefined;
  }, [data]);

  return { business, loading, error };
};
