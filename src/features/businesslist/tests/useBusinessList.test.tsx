import {useBusinessList} from '../useBusinessList';
import * as useBusinessListQuery from '../../../domain/hook/useBusinessListQuery';
import {renderHook} from '@testing-library/react-hooks';
import {ApolloError} from '@apollo/client';
import {BusinessDomainModel} from '../../../domain/model/BusinessDomainModel';

describe('useBusinessList', () => {
  it('loading', async () => {
    // Given
    const term = 'term';
    const location = 'location';
    const rating = 'rating';
    const limit = 10;

    const spy = jest.spyOn(useBusinessListQuery, 'useBusinessListQuery');
    spy.mockReturnValue({businesses: [], loading: true, error: undefined});

    // When
    const {result} = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
  });

  it('error', async () => {
    // Given
    const term = 'term';
    const location = 'location';
    const rating = 'rating';
    const limit = 10;
    const error = new ApolloError({});

    const spy = jest.spyOn(useBusinessListQuery, 'useBusinessListQuery');
    spy.mockReturnValue({businesses: [], loading: false, error: error});

    // When
    const {result} = renderHook(() => useBusinessList(term, location, rating, limit));

    // Then
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
  });

  it('success', async () => {
    // Given
    const term = 'term';
    const location = 'location';
    const rating = 'rating';
    const limit = 10;
    const businesses: BusinessDomainModel[] = [
      {
        id: 'id',
        name: 'name',
        photo: 'photo',
      },
    ];

    const spy = jest.spyOn(useBusinessListQuery, 'useBusinessListQuery');
    spy.mockReturnValue({businesses: businesses, loading: false, error: undefined});

    // When
    const {result} = renderHook(() => useBusinessList(term, location, rating, limit));

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
});
