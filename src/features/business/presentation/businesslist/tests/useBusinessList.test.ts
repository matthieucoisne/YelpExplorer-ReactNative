import { renderHook } from '@testing-library/react-hooks';
import { Business } from '../../../domain/model/Business';
import { GetBusinessListUseCase } from '../../../domain/usecase/GetBusinessListUseCase';
import { BusinessUiModel } from '../BusinessListUiModel';
import { useBusinessList } from '../useBusinessList';

const fakeUseCase: GetBusinessListUseCase = {
  execute(term: string, location: string, sortBy: string, limit: number): Promise<Business[]> {
    throw new Error('Function not implemented.');
  },
};
jest.mock('../../../../../core/Inject', () => {
  return {
    getBusinessListUseCase: fakeUseCase,
  };
});

describe('useBusinessList', () => {
  const term = 'term';
  const location = 'location';
  const sortBy = 'rating';
  const limit = 10;

  it('success', async () => {
    // Arrange
    const fakeBusiness: Business = {
      id: 'id',
      name: 'name',
      address: 'address',
      photoUrl: 'http://',
      price: '$$',
      categories: ['category#1'],
      reviewCount: 1337,
      rating: 4.5,
      hours: new Map<number, string[]>(),
      reviews: [],
    };
    const fakeBusinessList = [fakeBusiness, fakeBusiness];
    const fakeBusinessUiModel: BusinessUiModel = {
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
    const fakeBusinessListUiModel = [fakeBusinessUiModel, {...fakeBusinessUiModel, name: '2. NAME'}];
    jest.spyOn(fakeUseCase, 'execute').mockResolvedValue(fakeBusinessList);

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useBusinessList(term, location, sortBy, limit));

    // Assert
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.state.businesses).toStrictEqual(fakeBusinessListUiModel);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toBeUndefined();
    expect(fakeUseCase.execute).toHaveBeenNthCalledWith(1, term, location, sortBy, limit);
  });

  it('error', async () => {
    // Arrange
    const error = 'Something went wrong, please try again later.';
    jest.spyOn(fakeUseCase, 'execute').mockRejectedValue(error);

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useBusinessList(term, location, sortBy, limit));

    // Assert
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(true);
    expect(result.current.state.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.state.businesses).toStrictEqual([]);
    expect(result.current.state.isLoading).toEqual(false);
    expect(result.current.state.error).toStrictEqual(Error(`Error: ${error}`));
    expect(fakeUseCase.execute).toHaveBeenNthCalledWith(1, term, location, sortBy, limit);
  });
});
