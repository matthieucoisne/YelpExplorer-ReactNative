import { BusinessGraphQLDataSourceImpl } from '../features/business/data/graphql/datasource/remote/BusinessGraphQLDataSource';
import { BusinessGraphQLRepository } from '../features/business/data/graphql/repository/BusinessGraphQLRepository';
import { BusinessRestDataSourceImpl } from '../features/business/data/rest/datasource/remote/BusinessRestDataSource';
import { BusinessRestRepository } from '../features/business/data/rest/repository/BusinessRestRepository';
import { BusinessRepository } from '../features/business/domain/repository/BusinessRepository';
import { GetBusinessDetailsUseCaseImpl } from '../features/business/domain/usecase/GetBusinessDetailsUseCaseImpl';
import { GetBusinessListUseCaseImpl } from '../features/business/domain/usecase/GetBusinessListUseCaseImpl';
import * as Constants from './Constants';
import { graphQLClient } from './GraphQLClient';

/////////////////////////////////////////////////////////////////////////////////////////
// TODO: Find a way to inject these dependencies: useContext? Provider? Add Lazy loading?
/////////////////////////////////////////////////////////////////////////////////////////
const getBusinessRepository = (): BusinessRepository => {
  switch (Constants.DATA_LAYER) {
    case Constants.DataLayer.REST: {
      return new BusinessRestRepository(new BusinessRestDataSourceImpl());
    }
    case Constants.DataLayer.GRAPHQL: {
      return new BusinessGraphQLRepository(new BusinessGraphQLDataSourceImpl(graphQLClient));
    }
    default: {
      return new BusinessRestRepository(new BusinessRestDataSourceImpl());
    }
  }
};
const businessRepository = getBusinessRepository();

export const getBusinessListUseCase = new GetBusinessListUseCaseImpl(businessRepository);
export const getBusinessDetailsUseCase = new GetBusinessDetailsUseCaseImpl(businessRepository);
