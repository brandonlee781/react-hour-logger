import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import { fetchProjects, fetchLogs } from '../actions';
import { StoreStateType } from '../constants/types';

export const initialState: StoreStateType = {
  projects: {
    isFetching: false,
    didFail: false,
    items: []
  },
  logs: {
    isFetching: false,
    didFail: false,
    items: [],
    filtered: [],
  },
  ui: {
    drawerOpen: false,
    home: {
      selected: ''
    }
  }
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
);

store.dispatch(fetchProjects());
store.dispatch(fetchLogs());