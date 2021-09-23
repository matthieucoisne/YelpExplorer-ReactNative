import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.yelp.com/v3/graphql',
});

const authLink = setContext((_, { headers }) => {
  const appConfig = require('../../../config/app_config.json');

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${appConfig.api_key}`,
      'content-type': 'application/json',
      'accept-language': 'en_US',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
