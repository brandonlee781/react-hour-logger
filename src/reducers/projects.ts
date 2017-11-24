import * as Immutable from 'seamless-immutable';
import { RECEIVE_PROJECTS, RECEIVE_PROJECTS_FAILED, REQUEST_PROJECTS } from '../actions';
import { ProjectStateType, ActionType } from '../constants/types';

const iState: ProjectStateType = {
  isFetching: false,
  didFail: false,
  items: [],
};

export const initialState = Immutable.from(iState);

export const projectReducer = (state = initialState, action: ActionType<{}>): ProjectStateType => {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return state
        .set('isFetching', true)
        .set('didFail', false);
    case RECEIVE_PROJECTS:
      return state
        .set('isFetching', false)
        .set('didFail', false)
        .set('items', action.payload);
    case RECEIVE_PROJECTS_FAILED:
      return state
        .set('isFetching', false)
        .set('didFail', true);
    default:
      return state;
  }
};
