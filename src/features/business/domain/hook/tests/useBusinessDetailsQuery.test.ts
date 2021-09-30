import { ApolloError, useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { BusinessGraphQLModel } from '../../../data/graphql/model/BusinessGraphQLModel';
import { BusinessDomainModel } from '../../model/BusinessDomainModel';
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

describe('useBusinessListQueryTests', () => {
  const businessId = 'businessId';

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
    const expectedBusiness: BusinessDomainModel = {
      id: 'id',
      name: 'name',
      address: 'address1, city',
      categories: ['category#1'],
      imageUrl: 'http://',
      price: '$$',
      rating: 4.5,
      reviewCount: 1337,
    };
    mockUseQuery.mockImplementation(() => ({
      data: {
        business: business,
      },
      loading: false,
      error: undefined,
    }));

    // When
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // then
    expect(result.current.business).toEqual(expectedBusiness);
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
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // then
    expect(result.current.business).toEqual(undefined);
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
    const { result } = renderHook(() => useBusinessDetailsQuery(businessId));

    // then
    expect(result.current.business).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBe(error);
  });
});