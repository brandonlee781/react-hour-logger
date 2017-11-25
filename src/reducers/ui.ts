import * as Immutable from 'seamless-immutable';
// import { ImmutableArray, ImmutableObject } from 'seamless-immutable';
import { SET_HOME_SELECTED } from '../actions/ui';
import { ActionType, UIStateType } from '../constants/types';
import { TOGGLE_DRAWER } from '../actions/index';

const iState: UIStateType = {
  drawerOpen: false,
  home: {
    selected: ''
  }
};

export const initialState = Immutable.from(iState);

// tslint:disable-next-line:no-any
export const uiReducer = (state = initialState, action: ActionType<any>): UIStateType => {
  switch (action.type) {
    case SET_HOME_SELECTED:
      return state.setIn(['home', 'selected'], action.payload);
    case TOGGLE_DRAWER:
      return state.update('drawerOpen', x => !x);
    default:
      return state;
  }
};
