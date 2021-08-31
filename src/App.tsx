import React from 'react';

import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './data/graphql/client';
import BusinessListScreen from './features/business/BusinessListScreen';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BusinessListScreen />
  </ApolloProvider>
);

export default App;
