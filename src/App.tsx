import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { apolloClient } from './data/graphql/client';
import BusinessListScreen from './features/businesslist/BusinessListScreen';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BusinessListScreen />
  </ApolloProvider>
);

export default App;
