import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql';

const httpLink = createHttpLink({ uri: API_URL });

// Auth header injection
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token');
  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  }));
  return forward(operation);
});

// Global error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
      }
      console.error(`[GraphQL]: ${message}`);
    });
  }
  if (networkError) console.error(`[Network]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query: { fetchPolicy: 'network-only' },
  },
});