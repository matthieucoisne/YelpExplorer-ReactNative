import {ApolloError, useQuery} from '@apollo/client';
import {useMemo} from 'react';
import {businessListQuery} from '../../data/graphql/query/BusinessListQuery';
import {BusinessListResponse, toDomainModels} from '../../data/model/BusinessDataModel';
import {BusinessDomainModel} from '../model/BusinessDomainModel';

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
  const {data, loading, error} = useQuery<BusinessListResponse>(businessListQuery, {
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

  return {businesses, loading, error};
};
