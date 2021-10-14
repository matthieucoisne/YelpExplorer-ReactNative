import { Business } from '../../../../domain/model/Business';
import { BusinessRestDataSource } from '../../datasource/remote/BusinessRestDataSource';
import { BusinessListRestModel, BusinessRestModel } from '../../model/BusinessRestModel';
import { ReviewListRestModel, ReviewRestModel } from '../../model/ReviewRestModel';
import { BusinessRestRepository } from '../BusinessRestRepository';

afterEach(() => {
  jest.clearAllMocks();
});

describe('BusinessRestRepository', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;
  const businessId = 'businessId';

  const fakeRestDataSource: BusinessRestDataSource = {
    getBusinessList: function (
      term: string,
      location: string,
      sortBy: string,
      limit: number,
    ): Promise<BusinessListRestModel> {
      throw new Error('Function not implemented.');
    },
    getBusinessDetails: function (businessId: string): Promise<BusinessRestModel> {
      throw new Error('Function not implemented.');
    },
    getBusinessReviews: function (businessId: string): Promise<ReviewListRestModel> {
      throw new Error('Function not implemented.');
    },
  };
  const repository = new BusinessRestRepository(fakeRestDataSource);

  it('should get the business list', async () => {
    // Arrange
    const fakeBusinessRestModel: BusinessRestModel = {
      id: 'id',
      name: 'name',
      image_url: 'http://',
      review_count: 1337,
      categories: [{ title: 'category#1' }],
      rating: 4.5,
      price: '$$',
      location: { address1: 'address1', city: 'city' },
    };
    const fakeBusinessListRestModel: BusinessListRestModel = {
      businesses: [fakeBusinessRestModel, fakeBusinessRestModel],
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

    const mockGetBusinessList = jest.spyOn(fakeRestDataSource, 'getBusinessList').mockImplementation(() => {
      return Promise.resolve(fakeBusinessListRestModel);
    });
    const mockGetBusinessDetails = jest.spyOn(fakeRestDataSource, 'getBusinessDetails');
    const mockGetBusinessReviews = jest.spyOn(fakeRestDataSource, 'getBusinessReviews');

    // Act
    const result = await repository.getBusinessList(term, location, sortBy, limit);

    // Assert
    expect(result).toStrictEqual(fakeBusinessList);
    expect(mockGetBusinessList).toHaveBeenNthCalledWith(1, term, location, sortBy, limit);
    expect(mockGetBusinessDetails).toHaveBeenCalledTimes(0);
    expect(mockGetBusinessReviews).toHaveBeenCalledTimes(0);
  });

  it('should get the business details with reviews', async () => {
    // Arrange
    const fakeBusinessRestModel: BusinessRestModel = {
      id: 'id',
      name: 'name',
      image_url: 'http://',
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
    };
    const fakeReviewRestModel: ReviewRestModel = {
      id: 'id',
      user: {
        name: 'name',
        image_url: 'http://',
      },
      text: 'text',
      rating: 5,
      time_created: '2020-01-01 13:37:00',
    };
    const fakeReviewListRestModel: ReviewListRestModel = {
      reviews: [fakeReviewRestModel],
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

    const mockGetBusinessList = jest.spyOn(fakeRestDataSource, 'getBusinessList');
    const mockGetBusinessDetails = jest
      .spyOn(fakeRestDataSource, 'getBusinessDetails')
      .mockImplementation(() => {
        return Promise.resolve(fakeBusinessRestModel);
      });
    const mockGetBusinessReviews = jest
      .spyOn(fakeRestDataSource, 'getBusinessReviews')
      .mockImplementation(() => {
        return Promise.resolve(fakeReviewListRestModel);
      });

    // Act
    const result = await repository.getBusinessDetailsWithReviews(businessId);

    // Assert
    expect(result).toStrictEqual(fakeBusiness);
    expect(mockGetBusinessDetails).toHaveBeenNthCalledWith(1, businessId);
    expect(mockGetBusinessReviews).toHaveBeenNthCalledWith(1, businessId);
    expect(mockGetBusinessList).toHaveBeenCalledTimes(0);
  });
});
