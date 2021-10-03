import { ApolloError, useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { Business } from '../../../../domain/model/Business';
import { BusinessGraphQLModel } from '../../model/BusinessGraphQLModel';
import { useBusinessListQuery } from '../useBusinessListQuery';

jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    __esModule: true,
    ...originalModule,
    useQuery: jest.fn(),
  };
});

const mockUseQuery = useQuery as jest.Mock;

describe('useBusinessListQueryTests', () => {
  const term = 'term';
  const location = 'location';
  const rating = 'rating';
  const limit = 10;

  it('success', async () => {
    // Given
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
      hours: new Map(),
      reviews: [],
    };
    mockUseQuery.mockImplementation(() => ({
      data: {
        search: { business: [business, business] },
      },
      loading: false,
      error: undefined,
    }));

    // When
    const { result } = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([expectedBusiness, expectedBusiness]);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBeUndefined();
  });

  it('loading', async () => {
    // Given
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: true,
      error: undefined,
    }));

    // When
    const { result } = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([]);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toBeUndefined();
  });

  it('error', async () => {
    // Given
    const error = new ApolloError({});
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: error,
    }));

    // When
    const { result } = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([]);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBe(error);
  });
});