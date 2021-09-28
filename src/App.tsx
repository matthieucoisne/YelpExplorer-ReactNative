import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { apolloClient } from './data/graphql/client';
import { BusinessDetailsScreen } from './features/businessdetails/BusinessDetailsScreen';
import { BusinessListScreen } from './features/businesslist/BusinessListScreen';

type RootStackParamList = {
  BusinessList: undefined;
  BusinessDetails: { businessId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type businessDetailsScreenProp = NativeStackScreenProps<RootStackParamList, 'BusinessDetails'>;

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
