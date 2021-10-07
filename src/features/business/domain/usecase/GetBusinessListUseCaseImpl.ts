import { Business } from '../model/Business';
import { BusinessRepository } from '../repository/BusinessRepository';
import { GetBusinessListUseCase } from './GetBusinessListUseCase';

export class GetBusinessListUseCaseImpl implements GetBusinessListUseCase {
  private repository: BusinessRepository;

  constructor(repository: BusinessRepository) {
    this.repository = repository;
  }

  execute(term: string, location: string, sortBy: string, limit: number): Promise<Business[]> {
    return this.repository.getBusinessList(term, location, sortBy, limit);
  }
}
