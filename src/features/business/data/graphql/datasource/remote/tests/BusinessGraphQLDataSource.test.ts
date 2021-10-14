import {
  BusinessDetailsGraphQLModel,
  BusinessGraphQLModel,
  BusinessListGraphQLModel,
} from '../../../model/BusinessGraphQLModel';
import { businessDetailsQuery } from '../../../query/BusinessDetailsQuery';
import { businessListQuery } from '../../../query/BusinessListQuery';
import { BusinessGraphQLDataSourceImpl } from '../BusinessGraphQLDataSource';

afterEach(() => {
  jest.clearAllMocks();
});

describe('BusinessGraphQLDataSource', () => {
  jest.mock('@apollo/client', () => ({
    query: jest.fn(),
  }));
  const graphQLClient = require('@apollo/client');

  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;
  const businessId = 'businessId';

  const datasource = new BusinessGraphQLDataSourceImpl(graphQLClient);

  it('should get the business list from the GraphQL API', async () => {
    // Arrange
    const fakeBusiness: BusinessGraphQLModel = {
      id: 'id',
      name: 'name',
      photos: ['http://'],
      review_count: 1337,
      categories: [{ title: 'category#1' }],
      rating: 4.5,
      price: '$$',
      location: { address1: 'address1', city: 'city' },
    };
    const fakeBusinessList: BusinessListGraphQLModel = {
      search: {
        business: [fakeBusiness, fakeBusiness],
      },
    };
    const mockQuery = jest.spyOn(graphQLClient, 'query').mockResolvedValue({ data: fakeBusinessList });

    // Act
    const result = await datasource.getBusinessList(term, location, sortBy, limit);

    // Assert
    expect(result).toEqual(fakeBusinessList);
    expect(mockQuery).toHaveBeenNthCalledWith(1, {
      query: businessListQuery,
      variables: {
        term,
        location,
        sortBy,
        limit,
      },
    });
  });

  it('should get the business details with reviews from the GraphQL API', async () => {
    // Arrange
    const fakeBusiness: BusinessDetailsGraphQLModel = {
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
    const mockQuery = jest.spyOn(graphQLClient, 'query').mockResolvedValue({ data: fakeBusiness });

    // Act
    const result = await datasource.getBusinessDetailsWithReviews(businessId);

    // Assert
    expect(result).toEqual(fakeBusiness);
    expect(mockQuery).toHaveBeenNthCalledWith(1, {
      query: businessDetailsQuery,
      variables: {
        id: businessId,
      },
    });
  });
});
