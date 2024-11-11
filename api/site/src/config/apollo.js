import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  HttpLink
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { GRAPHQL_URL } from './constants';

const errorLink = onError(({ graphQLErrors, networkError }) => {

  if (graphQLErrors) {
    for (let err of graphQLErrors) {  
      if (err && err.code === 'INTERNAL_SERVER_ERROR') {
        if (err.message === 'Context creation failed: jwt expired') {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
          window.localStorage.removeItem('aggregate');
          window.location.href = '/login';
          return;
        }
      }
    }
  }
  if (networkError) {
    console.log(`[Network]: ${networkError}`);
  }
});

const timeoutDuration = 10000;
const httpLink = new HttpLink({ uri: GRAPHQL_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let sub;
    (async () => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          "x-jerur-operation-name": "jerur"
        },
      }));
      sub = forward(operation).subscribe(observer);
    })();
    return () => sub.unsubscribe();
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, httpLink, errorLink]),
  cache: new InMemoryCache(),
  credentials: 'include' 
});

client.defaultOptions = {
  watchQuery: {
    fetchOptions: {
      timeout: timeoutDuration,
    },
    fetchPolicy: 'cache-and-network',
  },
  query: {
    fetchOptions: {
      timeout: timeoutDuration,
    },
    fetchPolicy: 'cache-first',
  },
  mutate: {
    fetchOptions: {
      timeout: timeoutDuration,
    },
    fetchPolicy: 'no-cache',
  },
};

export { client };
