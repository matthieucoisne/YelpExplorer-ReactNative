import fetchMock from 'jest-fetch-mock';
import * as Constants from '../../../../../../../core/Constants';
import { BusinessListRestModel, BusinessRestModel } from '../../../model/BusinessRestModel';
import { ReviewListRestModel } from '../../../model/ReviewRestModel';
import { BusinessRestDataSourceImpl } from '../BusinessRestDataSource';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('BusinessRestDataSource', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;
  const businessId = 'businessId';

  const datasource = new BusinessRestDataSourceImpl();

  it('should get the business list from the REST API', async () => {
    // Arrange
    const fakeBusiness: BusinessRestModel = {
      id: 'id',
      name: 'name',
      image_url: 'http://',
      review_count: 1337,
      categories: [{ title: 'category#1' }],
      rating: 4.5,
      price: '$$',
      location: { address1: 'address1', city: 'city' },
    };
    const fakeBusinessList: BusinessListRestModel = {
      businesses: [fakeBusiness, fakeBusiness],
    };
    fetchMock.mockResponse(JSON.stringify(fakeBusinessList));

    // Act
    const result = await datasource.getBusinessList(term, location, sortBy, limit);

    // Assert
    expect(result).toEqual(fakeBusinessList);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${Constants.URL_REST}/businesses/search?term=${term}&location=${location}&sortBy=${sortBy}&limit=${limit}`,
      {
        method: 'GET',
        headers: Constants.HEADERS,
      },
    );
  });

  it('should get the business details from the REST API', async () => {
    // Arrange
    const fakeBusiness: BusinessRestModel = {
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
    fetchMock.mockResponse(JSON.stringify(fakeBusiness));

    // Act
    const result = await datasource.getBusinessDetails(businessId);

    // Assert
    expect(result).toEqual(fakeBusiness);
    expect(fetchMock).toHaveBeenNthCalledWith(1, `${Constants.URL_REST}/businesses/${businessId}`, {
      method: 'GET',
      headers: Constants.HEADERS,
    });
  });

  it('should get the business reviews from the REST API', async () => {
    // Arrange
    const fakeReviews: ReviewListRestModel = {
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
    };
    fetchMock.mockResponse(JSON.stringify(fakeReviews));

    // Act
    const result = await datasource.getBusinessReviews(businessId);

    // Assert
    expect(result).toEqual(fakeReviews);
    expect(fetchMock).toHaveBeenNthCalledWith(1, `${Constants.URL_REST}/businesses/${businessId}/reviews`, {
      method: 'GET',
      headers: Constants.HEADERS,
    });
  });
});
