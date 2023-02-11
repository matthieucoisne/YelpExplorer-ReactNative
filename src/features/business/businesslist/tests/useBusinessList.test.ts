import {ApolloError, useQuery} from '@apollo/client';
import {renderHook} from '@testing-library/react-hooks';
import {
  BusinessGraphQLModel,
  BusinessListGraphQLModel,
} from '../../../../data/graphql/model/BusinessGraphQLModel';
import {BusinessUiModel} from '../BusinessListUiModel';
import {useBusinessList} from '../useBusinessList';

jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    __esModule: true,
    ...originalModule,
    useQuery: jest.fn(),
  };
});
const mockUseQuery = useQuery as jest.Mock;

describe('useBusinessList', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;

  it('success', async () => {
    // Arrange
    const fakeBusiness: BusinessGraphQLModel = {
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
    const fakeBusinessList: BusinessListGraphQLModel = {
      search: {business: [fakeBusiness]},
    };
    const fakeBusinessUiModel: BusinessUiModel = {
      id: 'id',
      name: '1. NAME',
      address: 'address1, city',
      photoUrl: 'http://',
      priceAndCategories: '$$  •  category#1',
      reviewCount: '1337 reviews',
      ratingImage: {
        testUri: '../../../src/assets/stars_small_4_half.png',
      },
    };
    const fakeBusinessListUiModel = [fakeBusinessUiModel];
    mockUseQuery.mockImplementation(() => ({
      data: fakeBusinessList,
      loading: false,
      error: undefined,
    }));

    // Act
    const {result} = renderHook(() => useBusinessList(term, location, sortBy, limit));

    // Assert
    expect(result.current.state.businesses).toEqual(fakeBusinessListUiModel);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toBeUndefined();
  });

  it('loading', async () => {
    // Arrange
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      loading: true,
      error: undefined,
    }));

    // Act
    const {result} = renderHook(() => useBusinessList(term, location, sortBy, limit));

    // Assert
    expect(result.current.state.businesses).toEqual([]);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
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
    const {result} = renderHook(() => useBusinessList(term, location, sortBy, limit));

    // Assert
    expect(result.current.state.businesses).toEqual([]);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
  });
});
