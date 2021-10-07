import { Business } from '../model/Business';
import { BusinessRepository } from '../repository/BusinessRepository';
import { GetBusinessDetailsUseCase } from './GetBusinessDetailsUseCase';

export class GetBusinessDetailsUseCaseImpl implements GetBusinessDetailsUseCase {
  private repository: BusinessRepository;

  constructor(repository: BusinessRepository) {
    this.repository = repository;
  }

  execute(businessId: string): Promise<Business> {
    return this.repository.getBusinessDetailsWithReviews(businessId);
  }
}
