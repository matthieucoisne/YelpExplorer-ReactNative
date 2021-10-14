import { ApolloError, useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { Business } from '../../../../domain/model/Business';
import { BusinessGraphQLModel } from '../../model/BusinessGraphQLModel';
import { useBusinessDetailsQuery } from '../useBusinessDetailsQuery';

jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    __esModule: true,
    ...originalModule,
    useQuery: jest.fn(),
  };
});
const mockUseQuery = useQuery as jest.Mock;

describe('useBusinessDetailsQuery', () => {
  const businessId = 'businessId';

  it('success', async () => {
    // Arrange
    const business: BusinessGraphQLModel = {
      id: 'id',
      name: 'name',
      location: {
        address1: 'address1',
        city: 'city',
      },
      categories: [
        {
          title: 'category#1',
        },
      ],
      photos: ['http://'],
      price: '$$',
      rating: 4.5,
      review_count: 1337,
      reviews: [
        {
          id: 'id',
          user: {
            name: 'name',
            image_url: 'http://',
          },
          text: 'text',
          time_created: '01-01-2020',
          rating: 5,
        },
      ],
      hours: [
        {
          open: [
            {
              day: 0,
              start: '1800',
              end: '2200',
            },
            {
              day: 1,
              start: '1130',
              end: '1400',
            },
            {
              day: 1,
              start: '1800',
              end: '2200',
            },
          ],
        },
      ],
    };
    const expectedBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address1, city',
      categories: ['category#1'],
      photoUrl: 'http://',
      price: '$$',
      rating: 4.5,
      reviewCount: 1337,
      hours: new Map([
        [0, ['18:00 - 22:00']],
        [1, ['11:30 - 14:00', '18:00 - 22:00']],
      ]),
      reviews: [
        {
          id: 'id',
          user: {
            name: 'name',
            photoUrl: 'http://',
          },
          text: 'text',
          timeCreated: '01-01-2020',
          rating: 5,
        },
      ],
    };
    mockUseQuery.mockImplementation(() => ({
      data: {
        business: business,
      },
      loading: false,
      error: undefined,
    }));

    // Act
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // Assert
    expect(result.current.business).toEqual(expectedBusiness);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBeUndefined();
  });

  it('loading', async () => {
    // Arrange
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: true,
      error: undefined,
    }));

    // Act
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // Assert
    expect(result.current.business).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toBeUndefined();
  });

  it('error', async () => {
    // Arrange
    const error = new ApolloError({});
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: error,
    }));

    // Act
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // Assert
    expect(result.current.business).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBe(error);
  });
});
