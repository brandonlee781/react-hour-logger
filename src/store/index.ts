import { ReduxCache } from 'apollo-cache-redux';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
);

// tslint:disable:no-any
const cache = new ReduxCache({ dataIdFromObject: (o: any) => o.id, }, store);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_LINK + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  };
});

const noAuthLink = onError(({ networkError }: any)  => {
  if (networkError && networkError.statusCode === 401) {
    window.location.href = '/work/login';
  }
});

const authLinkMid = authLink.concat(noAuthLink);

export const client = new ApolloClient({
  link: authLinkMid.concat(httpLink),
  cache
});
