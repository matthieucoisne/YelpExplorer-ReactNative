import { Business } from '../model/Business';

export interface GetBusinessListUseCase {
  execute(term: string, location: string, sortBy: string, limit: number): Promise<Business[]>;
}
