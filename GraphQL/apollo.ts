import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// process.env.NEXT_PUBLIC_API_URL ||
const API_URL = 'http://localhost:5000/graphql';

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'include',
});

const errorLink = onError((error) => {
  const { graphQLErrors, networkError } = error as any;

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }: any) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        window.location.replace('/login');
      }

      console.error(`[GraphQL]: ${message}`);
    });
  }

  if (networkError) {
    console.error(`[Network]: ${networkError}`);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});