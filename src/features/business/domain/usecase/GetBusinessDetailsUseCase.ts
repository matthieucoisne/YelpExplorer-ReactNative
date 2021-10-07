import { Business } from '../model/Business';

export interface GetBusinessDetailsUseCase {
  execute(businessId: string): Promise<Business>;
}
