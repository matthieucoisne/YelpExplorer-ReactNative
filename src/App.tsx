import { ApolloProvider } from '@apollo/client';
import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { apolloClient } from './core/GraphQLClient';
import { BusinessGraphQLDataSource } from './features/business/data/graphql/datasource/remote/BusinessGraphQLDataSource';
import { BusinessGraphQLRepository } from './features/business/data/graphql/repository/BusinessGraphQLRepository';
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
  <ApolloProvider client={apolloClient}>
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
  </ApolloProvider>
);

// TODO useContext? Provider?
const businessRepository = new BusinessGraphQLRepository(new BusinessGraphQLDataSource(apolloClient));
export const getBusinessListUseCase = new GetBusinessListUseCaseImpl(businessRepository);
export const getBusinessDetailsUseCase = new GetBusinessDetailsUseCaseImpl(businessRepository);
