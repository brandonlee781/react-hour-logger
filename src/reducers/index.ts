import { combineReducers } from 'redux';
import { projectReducer as projects } from './projects';
import { uiReducer as ui } from './ui';
import { logReducer as logs } from './logs';

const rootReducer = combineReducers({
  projects,
  logs,
  ui,
});

export default rootReducer;