import { ApolloError } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import * as useBusinessDetailsQuery from '../../../domain/hook/useBusinessDetailsQuery';
import { BusinessDomainModel } from '../../../domain/model/Business';
import { BusinessDetailsUiModel } from '../BusinessDetailsUiModel';
import { useBusinessDetails } from '../useBusinessDetails';

describe('useBusinessList', () => {
  const businessId = 'businessId';

  const spy = jest.spyOn(useBusinessDetailsQuery, 'useBusinessDetailsQuery');

  it('success', async () => {
    // Given
    const business: BusinessDomainModel = {
      id: 'id',
      name: 'name',
      address: 'address',
      categories: ['category#1'],
      imageUrl: 'http://',
      price: '$$',
      rating: 4.5,
      reviewCount: 1337,
    };
    const expectedBusiness: BusinessDetailsUiModel = {
      id: 'id',
      name: 'NAME',
      address: 'address',
      imageUrl: 'http://',
      priceAndCategories: '$$  •  category#1',
      reviewCount: '1337 reviews',
      ratingImage: {
        testUri: '../../../src/assets/stars_small_4_half.png',
      },
    };
    spy.mockReturnValue({
      business: business,
      loading: false,
      error: undefined,
    });

    // When
    const { result } = renderHook(() => useBusinessDetails(businessId));

    // Then
    expect(result.current.state.business).toStrictEqual(expectedBusiness);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toBeUndefined();
  });

  it('loading', async () => {
    // Given
    spy.mockReturnValue({ business: undefined, loading: true, error: undefined });

    // When
    const { result } = renderHook(() => useBusinessDetails(businessId));

    // Then
    expect(result.current.state.business).toStrictEqual(undefined);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
  });

  it('error', async () => {
    // Given
    const error = new ApolloError({});
    spy.mockReturnValue({ business: undefined, loading: false, error: error });

    // When
    const { result } = renderHook(() => useBusinessDetails(businessId));

    // Then
    expect(result.current.state.business).toStrictEqual(undefined);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
  });
});
