import './index.css';
import 'raf/polyfill';

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { client, store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
