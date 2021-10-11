import { Business } from '../../model/Business';
import { Review } from '../../model/Review';
import { BusinessRepository } from '../../repository/BusinessRepository';
import { GetBusinessDetailsUseCaseImpl } from '../GetBusinessDetailsUseCaseImpl';

describe('GetBusinessDetailsUseCase', () => {
  const businessId = 'businessId';

  it('should get the business details', async () => {
    // Arrange
    const expectedReview: Review = {
      id: '',
      user: {
        name: 'name',
        photoUrl: 'photoUrl',
      },
      text: 'text',
      rating: 5,
      timeCreated: '01-01-2020',
    };
    const expectedReviews = [expectedReview, expectedReview];
    const expectedBusiness: Business = {
      id: 'id',
      name: '1. NAME',
      address: 'address',
      photoUrl: 'http://',
      price: '$$',
      categories: ['category#1'],
      reviewCount: 1337,
      rating: 4.5,
      hours: new Map<number, string[]>(),
      reviews: expectedReviews,
    };

    const fakeRepository: BusinessRepository = {
      getBusinessList(term: string, location: string, sortBy: string, limit: number) {
        throw new Error('IGNORED');
      },
      getBusinessDetailsWithReviews(businessId: string): Promise<Business> {
        return Promise.resolve(expectedBusiness);
      },
    };
    const mockGetBusinessList = jest.spyOn(fakeRepository, 'getBusinessList');
    const mockGetBusinessDetailsWithReviews = jest.spyOn(fakeRepository, 'getBusinessDetailsWithReviews');

    const usecase = new GetBusinessDetailsUseCaseImpl(fakeRepository);

    // Act
    const result = await usecase.execute(businessId);

    // Assert
    expect(result).toStrictEqual(expectedBusiness);
    expect(mockGetBusinessDetailsWithReviews).toHaveBeenCalledTimes(1);
    expect(mockGetBusinessDetailsWithReviews).toHaveBeenCalledWith(businessId);
    expect(mockGetBusinessList).toHaveBeenCalledTimes(0);
  });
});
