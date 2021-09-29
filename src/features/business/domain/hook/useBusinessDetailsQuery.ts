import { ApolloError, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { BusinessDetailsGraphQLResponse, toDomainModel } from '../../data/graphql/model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../../data/graphql/query/BusinessDetailsQuery';
import { BusinessDomainModel } from '../model/BusinessDomainModel';

export interface UseBusinessDetailsQueryHook {
  business?: BusinessDomainModel;
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
    return data ? toDomainModel(data.business) : undefined;
  }, [data]);

  return { business, loading, error };
};
