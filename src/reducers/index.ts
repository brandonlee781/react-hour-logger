import { combineReducers } from 'redux';
import { apolloReducer as apollo } from 'apollo-cache-redux';
import { projectReducer as projects } from './projects';
import { uiReducer as ui } from './ui';
import { logReducer as logs } from './logs';

const rootReducer = combineReducers({
  apollo,
  projects,
  logs,
  ui,
});

export default rootReducer;