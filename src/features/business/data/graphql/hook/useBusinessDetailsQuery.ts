import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Business } from '../../../domain/model/Business';
import * as BusinessGraphQLMapper from '../mapper/BusinessGraphQLMapper';
import { BusinessDetailsGraphQLResponse } from '../model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../query/BusinessDetailsQuery';

export interface UseBusinessDetailsQueryHook {
  business: Business | undefined;
  loading: boolean;
  error: Error | undefined;
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
