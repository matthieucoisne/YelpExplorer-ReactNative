import {ApolloError, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {businessListQuery} from '../../data/graphql/query/BusinessListQuery';
import {BusinessListResponse, toDomainModels} from '../../data/model/BusinessDataModel';
import {BusinessDomainModel} from '../model/BusinessDomainModel';

// Custom hook that is only responsible for calling another hook whose responsibilty
// is to get/persist the data from the internet and transforming it into something domain related.
// I believe it's like a usecase, and useQuery is like a repository. <- I need to double check on this

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
  const [businesses, setBusinesses] = useState<BusinessDomainModel[]>([]);
  const {data, loading, error} = useQuery<BusinessListResponse>(businessListQuery, {
    variables: {
      term,
      location,
      sortBy,
      limit,
    },
  });

  useEffect(() => {
    setBusinesses(toDomainModels(data?.search?.business ?? []));
  }, [data, loading, error]);

  return {businesses, loading, error};
};
