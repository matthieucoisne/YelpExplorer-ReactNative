import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { businessDetailsQuery } from '../../data/graphql/query/BusinessDetailsQuery';
import { BusinessDetailsResponse, toDomainModel } from '../../data/model/BusinessDataModel';
import { BusinessDomainModel } from '../model/BusinessDomainModel';

export interface UseBusinessDetailsQueryHook {
  business?: BusinessDomainModel;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useBusinessDetailsQuery = (businessId: String): UseBusinessDetailsQueryHook => {
  const { data, loading, error } = useQuery<BusinessDetailsResponse>(businessDetailsQuery, {
    variables: {
      id: businessId,
    },
  });

  const business = useMemo(() => {
    return data ? toDomainModel(data.business) : undefined;
  }, [data]);

  return { business, loading, error };
};
