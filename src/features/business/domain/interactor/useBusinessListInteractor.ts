import { useBusinessListQuery } from '../../data/graphql/hook/useBusinessListQuery';
import { Business } from '../model/Business';

export interface UseBusinessListInteractorHook {
  businesses: Business[];
  loading: boolean;
  error: Error | undefined;
}

export const useBusinessListInteractor = (
  term: String,
  location: String,
  sortBy: String,
  limit: number,
): UseBusinessListInteractorHook => {
  return useBusinessListQuery(term, location, sortBy, limit);
};
