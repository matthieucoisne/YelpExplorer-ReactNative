import { useBusinessDetailsQuery } from '../../data/graphql/hook/useBusinessDetailsQuery';
import { Business } from '../model/Business';

export interface UseBusinessDetailsInteractorHook {
  business: Business | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const useBusinessDetailsInteractor = (businessId: String): UseBusinessDetailsInteractorHook => {
  return useBusinessDetailsQuery(businessId);
};
