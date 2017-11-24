import * as Immutable from 'seamless-immutable';
import { RECEIVE_LOGS, RECEIVE_LOGS_FAILED, REQUEST_LOGS, FILTER_LOGS } from '../actions/logs';
import { Log, ActionType, LogStateType } from '../constants/types';
import { ImmutableObject } from 'seamless-immutable';

const iState: LogStateType = {
  isFetching: false,
  didFail: false,
  items: [],
  filtered: [],
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
        .set('items', action.payload)
        .set('filtered', action.payload);
    case RECEIVE_LOGS_FAILED:
      return state
        .set('isFetching', false)
        .set('didFail', true); 
    case FILTER_LOGS:
      // tslint:disable-next-line:no-any
      const logs: ImmutableObject<any> = state.getIn(['items']);
      if (action.payload === '') {
        return state.set('filtered', logs);
      }
      const filtered: Log[] = logs.filter((log: Log) => log.project.toLowerCase() === action.payload);
      return state.set('filtered', filtered);
    default: 
      return state;
  }
};