import { DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
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
