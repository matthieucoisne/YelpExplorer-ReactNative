import { Business } from '../model/Business';

export interface BusinessRepository {
  getBusinessList(term: string, location: string, sortBy: string, limit: number): Promise<Business[]>;
  getBusinessDetailsWithReviews(businessId: string): Promise<Business>;
}
