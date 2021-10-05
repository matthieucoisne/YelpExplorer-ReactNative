import { useBusinessDetailsQuery } from '../../data/graphql/hook/useBusinessDetailsQuery';
import { Business } from '../model/Business';

export interface UseBusinessDetailsInteractorHook {
  business: Business | undefined;
  loading: boolean;
  error: Error | undefined;
}

// See https://github.com/matthieucoisne/YelpExplorer-ReactNative/pull/24
export const useBusinessDetailsInteractor = (businessId: string): UseBusinessDetailsInteractorHook => {
  return useBusinessDetailsQuery(businessId);
};
