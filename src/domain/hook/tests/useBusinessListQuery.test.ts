import {ApolloError, useQuery} from '@apollo/client';
import {renderHook} from '@testing-library/react-hooks';
import {useBusinessListQuery} from '../useBusinessListQuery';

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
    mockUseQuery.mockImplementation(() => ({
      data: {
        search: {
          business: [{id: '', name: '', photos: ['http://']}],
        },
      },
      loading: false,
      error: undefined,
    }));

    // When
    const {result} = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([{id: '', name: '', photo: 'http://'}]);
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
    const {result} = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([]);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toBeUndefined();
  });

  it('error', async () => {
    // Given
    const error = new ApolloError({})
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: false,
      error: error,
    }));

    // When
    const {result} = renderHook(() => useBusinessListQuery(term, location, rating, limit));

    // then
    expect(result.current.businesses).toEqual([]);
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBe(error);
  });
});
