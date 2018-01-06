import * as Immutable from 'seamless-immutable';
// import { ImmutableArray, ImmutableObject } from 'seamless-immutable';
import { 
  SET_HOME_SELECTED, 
  SET_INVOICE_FILTER, 
  SET_INVOICE_SELECTED, 
  SET_INVOICE_TAB,
} from '../actions/ui';
import { ActionType, UIStateType } from '../constants/types';
import { TOGGLE_DRAWER, TOGGLE_NEW_LOG_FORM, TOGGLE_NEW_INVOICE_FORM } from '../actions/index';

const iState: UIStateType = {
  drawerOpen: false,
  home: {
    selected: '',
    newLogFormShown: false,
  },
  invoice: {
    selected: '',
    newInvoiceFormShown: false,
    tab: 'hours',
    start: '',
    end: '',
    project: ''
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
    case TOGGLE_NEW_LOG_FORM:
      return state.updateIn(['home', 'newLogFormShown'], x => !x);
    case TOGGLE_NEW_INVOICE_FORM:
      return state.updateIn(['invoice', 'newInvoiceFormShown'], x => !x);
    case SET_INVOICE_SELECTED:
      return state.setIn(['invoice', 'selected'], action.payload);
    case SET_INVOICE_TAB:
      return state.setIn(['invoice', 'tab'], action.payload);
    case SET_INVOICE_FILTER:
      return state.setIn(['invoice', action.payload.key], action.payload.date);
    default:
      return state;
  }
};
