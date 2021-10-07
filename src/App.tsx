import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import * as Constants from './core/Constants';
import { graphQLClient } from './core/GraphQLClient';
import { BusinessGraphQLDataSource } from './features/business/data/graphql/datasource/remote/BusinessGraphQLDataSource';
import { BusinessGraphQLRepository } from './features/business/data/graphql/repository/BusinessGraphQLRepository';
import { BusinessRestDataSource } from './features/business/data/rest/datasource/remote/BusinessRestDataSource';
import { BusinessRestRepository } from './features/business/data/rest/repository/BusinessRestRepository';
import { BusinessRepository } from './features/business/domain/repository/BusinessRepository';
import { GetBusinessDetailsUseCaseImpl } from './features/business/domain/usecase/GetBusinessDetailsUseCaseImpl';
import { GetBusinessListUseCaseImpl } from './features/business/domain/usecase/GetBusinessListUseCaseImpl';
import { BusinessDetailsScreen } from './features/business/presentation/businessdetails/BusinessDetailsScreen';
import { BusinessListScreen } from './features/business/presentation/businesslist/BusinessListScreen';

// Theme
const appTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#333' } };

// Navigation
type RootStackParamList = {
  BusinessList: undefined;
  BusinessDetails: { businessId: string };
};
export type BusinessDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'BusinessDetails'>;
export type BusinessDetailsRouteProp = RouteProp<RootStackParamList, 'BusinessDetails'>;
const Stack = createStackNavigator<RootStackParamList>();

export const App = () => (
  <NavigationContainer theme={appTheme}>
    <Stack.Navigator
      initialRouteName="BusinessList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#D32F2F',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="BusinessList"
        component={BusinessListScreen}
        options={{ title: 'YelpExplorer-ReactNative' }}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetailsScreen}
        options={{ title: 'YelpExplorer-ReactNative' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

/////////////////////////////////////////////////////////////////////////////////////////
// TODO: Find a way to inject these dependencies: useContext? Provider? Add Lazy loading?
/////////////////////////////////////////////////////////////////////////////////////////
const getBusinessRepository = (): BusinessRepository => {
  switch (Constants.DATA_LAYER) {
    case Constants.DataLayer.GRAPHQL: {
      return new BusinessGraphQLRepository(new BusinessGraphQLDataSource(graphQLClient));
    }
    case Constants.DataLayer.REST: {
      return new BusinessRestRepository(new BusinessRestDataSource());
    }
  }
};
const businessRepository = getBusinessRepository();

export const getBusinessListUseCase = new GetBusinessListUseCaseImpl(businessRepository);
export const getBusinessDetailsUseCase = new GetBusinessDetailsUseCaseImpl(businessRepository);
