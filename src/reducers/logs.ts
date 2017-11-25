import * as Immutable from 'seamless-immutable';
import { RECEIVE_LOGS, RECEIVE_LOGS_FAILED, REQUEST_LOGS } from '../actions/logs';
import { ActionType, LogStateType } from '../constants/types';

const iState: LogStateType = {
  isFetching: false,
  didFail: false,
  items: [],
};

export const initialState = Immutable.from(iState);

export const logReducer = (state = initialState, action: ActionType<{}>): LogStateType => {
  switch (action.type) {
    case REQUEST_LOGS:
      return state
        .set('isFetching', true)
        .set('didFail', false);
    case RECEIVE_LOGS: 
      return state
        .set('isFetching', false)
        .set('didFail', false)
        .set('items', action.payload);
    case RECEIVE_LOGS_FAILED:
      return state
        .set('isFetching', false)
        .set('didFail', true); 
    default: 
      return state;
  }
};