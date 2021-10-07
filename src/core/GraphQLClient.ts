import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as Constants from './Constants';

const httpLink = createHttpLink({
  uri: Constants.URL_GRAPHQL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: Constants.HEADERS,
  };
});

export const graphQLClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
