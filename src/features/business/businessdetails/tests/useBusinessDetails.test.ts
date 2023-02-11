import {ApolloError, useQuery} from '@apollo/client';
import {renderHook} from '@testing-library/react-hooks';
import {
  BusinessDetailsGraphQLModel,
  BusinessGraphQLModel,
} from '../../../../data/graphql/model/BusinessGraphQLModel';
import {BusinessDetailsUiModel} from '../BusinessDetailsUiModel';
import {useBusinessDetails} from '../useBusinessDetails';

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
    const fakeBusinessGraphQLModel: BusinessGraphQLModel = {
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
              start: '1100',
              end: '1400',
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
    const fakeBusinessDetailsGraphQLModel: BusinessDetailsGraphQLModel = {
      business: fakeBusinessGraphQLModel,
    };
    const fakeBusinessDetailsUiModel: BusinessDetailsUiModel = {
      id: 'id',
      name: 'NAME',
      address: 'address1, city',
      photoUrl: 'http://',
      priceAndCategories: '$$  •  category#1',
      reviewCount: '1337 reviews',
      ratingImage: {
        testUri: '../../../src/assets/stars_small_4_half.png',
      },
      hours: [
        ['Monday', '11:00 - 14:00'],
        ['Tuesday', '11:30 - 14:00'],
        ['', '18:00 - 22:00'],
        ['Wednesday', 'Closed'],
        ['Thursday', 'Closed'],
        ['Friday', 'Closed'],
        ['Saturday', 'Closed'],
        ['Sunday', 'Closed'],
      ],
      reviews: [
        {
          id: 'id',
          user: {
            name: 'name',
            photoUrl: 'http://',
          },
          text: 'text',
          timeCreated: '01-01-2020',
          ratingImage: {
            testUri: '../../../src/assets/stars_small_5.png',
          },
        },
      ],
    };
    mockUseQuery.mockImplementation(() => ({
      data: fakeBusinessDetailsGraphQLModel,
      loading: false,
      error: undefined,
    }));

    // Act
    const {result} = renderHook(() => useBusinessDetails(businessId));

    // Assert
    expect(result.current.state.business).toEqual(fakeBusinessDetailsUiModel);
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
    const {result} = renderHook(() => useBusinessDetails(businessId));

    // Assert
    expect(result.current.state.business).toEqual(undefined);
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
    const {result} = renderHook(() => useBusinessDetails(businessId));

    // Assert
    expect(result.current.state.business).toEqual(undefined);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
  });
});
