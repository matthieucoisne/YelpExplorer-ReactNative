import { ApolloProvider } from '@apollo/client';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { apolloClient } from './data/graphql/client';
import { BusinessDetailsScreen } from './features/businessdetails/BusinessDetailsScreen';
import { BusinessListScreen } from './features/businesslist/BusinessListScreen';

type RootStackParamList = {
  BusinessList: undefined;
  BusinessDetails: { businessId: string };
};
export type BusinessDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'BusinessDetails'>;
export type BusinessDetailsRouteProp = RouteProp<RootStackParamList, 'BusinessDetails'>;

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BusinessList">
        <Stack.Screen
          name="BusinessList"
          component={BusinessListScreen}
          options={{ title: 'YelpExplorer-ReactNative' }}
        />
        <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);
