import {renderHook} from '@testing-library/react-hooks';
import {Business} from '../../../domain/model/Business';
import {GetBusinessDetailsUseCase} from '../../../domain/usecase/GetBusinessDetailsUseCase';
import {BusinessDetailsUiModel} from '../BusinessDetailsUiModel';
import {useBusinessDetails} from '../useBusinessDetails';

const fakeUseCase: GetBusinessDetailsUseCase = {
  execute: function (): Promise<Business> {
    throw new Error('Function not implemented.');
  },
};
jest.mock('../../../../../core/Inject', () => {
  return {
    getBusinessDetailsUseCase: fakeUseCase,
  };
});

describe('useBusinessDetails', () => {
  const businessId = 'businessId';

  it('success', async () => {
    // Arrange
    const fakeBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address',
      categories: ['category#1'],
      photoUrl: 'http://',
      price: '$$',
      rating: 4.5,
      reviewCount: 1337,
      hours: new Map([
        [0, ['11:00 - 14:00', '16:00 - 23:00']],
        [1, ['11:00 - 14:00']],
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
    const fakeBusinessDetailsUiModel: BusinessDetailsUiModel = {
      id: 'id',
      name: 'NAME',
      address: 'address',
      photoUrl: 'http://',
      priceAndCategories: '$$  •  category#1',
      reviewCount: '1337 reviews',
      ratingImage: {
        testUri: '../../../src/assets/stars_small_4_half.png',
      },
      hours: [
        ['Monday', '11:00 - 14:00'],
        ['', '16:00 - 23:00'],
        ['Tuesday', '11:00 - 14:00'],
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
    jest.spyOn(fakeUseCase, 'execute').mockResolvedValue(fakeBusiness);

    // Act
    const {result, waitForNextUpdate} = renderHook(() => useBusinessDetails(businessId));

    // Assert
    expect(result.current.state.business).toBeUndefined();
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.state.business).toStrictEqual(fakeBusinessDetailsUiModel);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toBeUndefined();
    expect(fakeUseCase.execute).toHaveBeenNthCalledWith(1, businessId);
  });

  it('error', async () => {
    // Arrange
    const error = 'Something went wrong, please try again later.';
    jest.spyOn(fakeUseCase, 'execute').mockRejectedValue(error);

    // Act
    const {result, waitForNextUpdate} = renderHook(() => useBusinessDetails(businessId));

    // Assert
    expect(result.current.state.business).toBeUndefined();
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.state.business).toBeUndefined();
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
    expect(fakeUseCase.execute).toHaveBeenNthCalledWith(1, businessId);
  });
});
