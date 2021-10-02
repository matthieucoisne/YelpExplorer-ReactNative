import { ApolloError } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import * as useBusinessListQuery from '../../../data/graphql/hook/useBusinessListQuery';
import { Business } from '../../../domain/model/Business';
import { BusinessListUiModel } from '../BusinessListUiModel';
import { useBusinessList } from '../useBusinessList';

describe('useBusinessList', () => {
  const term = 'term';
  const location = 'location';
  const rating = 'rating';
  const limit = 10;

  const spy = jest.spyOn(useBusinessListQuery, 'useBusinessListQuery');

  it('success', async () => {
    // Given
    const business: Business = {
      id: 'id',
      name: 'name',
      address: 'address',
      categories: ['category#1'],
      photoUrl: 'http://',
      price: '$$',
      rating: 4.5,
      reviewCount: 1337,
      reviews: [],
    };
    const expectedBusiness: BusinessListUiModel = {
      id: 'id',
      name: '1. NAME',
      address: 'address',
      photoUrl: 'http://',
      priceAndCategories: '$$  •  category#1',
      reviewCount: '1337 reviews',
      ratingImage: {
        testUri: '../../../src/assets/stars_small_4_half.png',
      },
    };
    spy.mockReturnValue({
      businesses: [business],
      loading: false,
      error: undefined,
    });

    // When
    const { result } = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([expectedBusiness]);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toBeUndefined();
  });

  it('loading', async () => {
    // Given
    spy.mockReturnValue({ businesses: [], loading: true, error: undefined });

    // When
    const { result } = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
  });

  it('error', async () => {
    // Given
    const error = new ApolloError({});
    spy.mockReturnValue({ businesses: [], loading: false, error: error });

    // When
    const { result } = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
  });
});
