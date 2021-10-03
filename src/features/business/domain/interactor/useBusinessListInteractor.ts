import { useBusinessListQuery } from '../../data/graphql/hook/useBusinessListQuery';
import { Business } from '../model/Business';

export interface UseBusinessListInteractorHook {
  businesses: Business[];
  loading: boolean;
  error: Error | undefined;
}

// See https://github.com/matthieucoisne/YelpExplorer-ReactNative/pull/24
export const useBusinessListInteractor = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
): UseBusinessListInteractorHook => useBusinessListQuery(term, location, sortBy, limit);
