import { Business } from '../../../../domain/model/Business';
import { BusinessGraphQLDataSource } from '../../datasource/remote/BusinessGraphQLDataSource';
import {
  BusinessDetailsGraphQLModel,
  BusinessGraphQLModel,
  BusinessListGraphQLModel,
} from '../../model/BusinessGraphQLModel';
import { BusinessGraphQLRepository } from '../BusinessGraphQLRepository';

afterEach(() => {
  jest.clearAllMocks();
});

describe('BusinessGraphQLRepository', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;
  const businessId = 'businessId';

  const fakeGraphQLDataSource: BusinessGraphQLDataSource = {
    getBusinessList(
      term: string,
      location: string,
      sortBy: string,
      limit: number,
    ): Promise<BusinessListGraphQLModel> {
      throw new Error('Function not implemented.');
    },
    getBusinessDetailsWithReviews(businessId: string): Promise<BusinessDetailsGraphQLModel> {
      throw new Error('Function not implemented.');
    },
  };
  const repository = new BusinessGraphQLRepository(fakeGraphQLDataSource);

  it('should get the business list', async () => {
    // Arrange
    const fakeBusinessGraphQLModel: BusinessGraphQLModel = {
      id: 'id',
      name: 'name',
      photos: ['http://'],
      review_count: 1337,
      categories: [{ title: 'category#1' }],
      rating: 4.5,
      price: '$$',
      location: { address1: 'address1', city: 'city' },
    };
    const fakeBusinessListGraphQLModel: BusinessListGraphQLModel = {
      search: {
        business: [fakeBusinessGraphQLModel, fakeBusinessGraphQLModel],
      },
    };
    const fakeBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address1, city',
      photoUrl: 'http://',
      price: '$$',
      categories: ['category#1'],
      reviewCount: 1337,
      rating: 4.5,
      hours: new Map<number, string[]>(),
      reviews: [],
    };
    const fakeBusinessList = [fakeBusiness, fakeBusiness];

    const mockGetBusinessList = jest
      .spyOn(fakeGraphQLDataSource, 'getBusinessList')
      .mockImplementation(() => {
        return Promise.resolve(fakeBusinessListGraphQLModel);
      });
    const mockGetBusinessDetails = jest.spyOn(fakeGraphQLDataSource, 'getBusinessDetailsWithReviews');

    // Act
    const result = await repository.getBusinessList(term, location, sortBy, limit);

    // Assert
    expect(result).toStrictEqual(fakeBusinessList);
    expect(mockGetBusinessList).toHaveBeenNthCalledWith(1, term, location, sortBy, limit);
    expect(mockGetBusinessDetails).toHaveBeenCalledTimes(0);
  });

  it('should get the business details with reviews', async () => {
    // Arrange
    const fakeBusinessGraphQLModel: BusinessDetailsGraphQLModel = {
      business: {
        id: 'id',
        name: 'name',
        photos: ['http://'],
        review_count: 1337,
        categories: [{ title: 'category#1' }],
        rating: 4.5,
        price: '$$',
        location: { address1: 'address1', city: 'city' },
        hours: [
          {
            open: [
              {
                start: '1600',
                end: '2300',
                day: 1,
              },
            ],
          },
        ],
        reviews: [
          {
            id: 'id',
            user: {
              name: 'name',
              image_url: 'http://',
            },
            text: 'text',
            rating: 5,
            time_created: '2020-01-01 13:37:00',
          },
        ],
      },
    };
    const fakeBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address1, city',
      photoUrl: 'http://',
      price: '$$',
      categories: ['category#1'],
      reviewCount: 1337,
      rating: 4.5,
      hours: new Map([[1, ['16:00 - 23:00']]]),
      reviews: [
        {
          id: 'id',
          user: {
            name: 'name',
            photoUrl: 'http://',
          },
          text: 'text',
          rating: 5,
          timeCreated: '2020-01-01',
        },
      ],
    };

    const mockGetBusinessList = jest.spyOn(fakeGraphQLDataSource, 'getBusinessList');
    const mockGetBusinessDetails = jest
      .spyOn(fakeGraphQLDataSource, 'getBusinessDetailsWithReviews')
      .mockImplementation(() => {
        return Promise.resolve(fakeBusinessGraphQLModel);
      });

    // Act
    const result = await repository.getBusinessDetailsWithReviews(businessId);

    // Assert
    expect(result).toStrictEqual(fakeBusiness);
    expect(mockGetBusinessDetails).toHaveBeenNthCalledWith(1, businessId);
    expect(mockGetBusinessList).toHaveBeenCalledTimes(0);
  });
});
