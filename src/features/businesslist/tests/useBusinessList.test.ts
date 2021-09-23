import { ApolloError } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import * as useBusinessListQuery from '../../../domain/hook/useBusinessListQuery';
import { useBusinessList } from '../useBusinessList';

describe('useBusinessList', () => {
  const term = 'term';
  const location = 'location';
  const rating = 'rating';
  const limit = 10;

  const spy = jest.spyOn(useBusinessListQuery, 'useBusinessListQuery');

  it('success', async () => {
    // Given
    spy.mockReturnValue({
      businesses: [
        {
          id: 'id',
          name: 'name',
          photo: 'photo',
        },
      ],
      loading: false,
      error: undefined,
    });

    // When
    const { result } = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([
      {
        id: 'id',
        name: 'name',
        photo: 'photo',
      },
    ]);
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
