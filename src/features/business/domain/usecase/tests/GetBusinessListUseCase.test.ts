import {Business} from '../../model/Business';
import {BusinessRepository} from '../../repository/BusinessRepository';
import {GetBusinessListUseCaseImpl} from '../GetBusinessListUseCaseImpl';

describe('GetBusinessListUseCase', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;

  it('should get the business list', async () => {
    // Arrange
    const fakeBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address',
      photoUrl: 'http://',
      price: '$$',
      categories: ['category#1'],
      reviewCount: 1337,
      rating: 4.5,
      hours: new Map<number, string[]>(),
      reviews: [],
    };
    const fakeRepository: BusinessRepository = {
      getBusinessList(): Promise<Business[]> {
        return Promise.resolve([fakeBusiness]);
      },
      getBusinessDetailsWithReviews(): Promise<Business> {
        throw new Error('IGNORED');
      },
    };
    const mockGetBusinessList = jest.spyOn(fakeRepository, 'getBusinessList');
    const mockGetBusinessDetailsWithReviews = jest.spyOn(
      fakeRepository,
      'getBusinessDetailsWithReviews',
    );

    const usecase = new GetBusinessListUseCaseImpl(fakeRepository);

    // Act
    const result = await usecase.execute(term, location, sortBy, limit);

    // Assert
    expect(result).toStrictEqual([fakeBusiness]);
    expect(mockGetBusinessList).toHaveBeenNthCalledWith(1, term, location, sortBy, limit);
    expect(mockGetBusinessDetailsWithReviews).toHaveBeenCalledTimes(0);
  });
});
