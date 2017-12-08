import { ActionType } from '../constants/types';
import { Dispatch } from 'react-redux';
export const SCREEN_SIZE = 'SCREEN_SIZE';
export const SET_HOME_DRAWER = 'SET_HOME_DRAWER';
export const SET_HOME_SELECTED = 'SET_HOME_SELECTED';
export const SET_INVOICE_SELECTED = 'SET_INVOICE_SELECTED';
export const SET_INVOICE_TAB = 'SET_INVOICE_TAB';
export const SET_INVOICE_FILTER = 'SET_INVOICE_FILTER';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_NEW_LOG_FORM = 'TOGGLE_NEW_LOG_FORM';
export const TOGGLE_NEW_INVOICE_FORM = 'TOGGLE_NEW_INVOICE_FORM';

export function setHomeDrawerSelected(id: string): ActionType<string> {
  return {
    type: SET_HOME_SELECTED,
    payload: id
  };
}

export function setInvoiceDrawerSelected(id: string): ActionType<string> {
  return {
    type: SET_INVOICE_SELECTED,
    payload: id
  };
}

export function toggleDrawer(): ActionType<string> {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function toggleNewLogForm(): ActionType<string> {
  return {
    type: TOGGLE_NEW_LOG_FORM,
  };
}

export function toggleNewInvoiceForm(): ActionType<{}> {
  return {
    type: TOGGLE_NEW_INVOICE_FORM,
  };
}

export function setInvoiceTab(tab: string): ActionType<string> {
  return {
    type: SET_INVOICE_TAB,
    payload: tab
  };
}

export type FilterKey = 'start' | 'end';

export function setInvoiceFilter(key: FilterKey, date: string): ActionType<{}> {
  return {
    type: SET_INVOICE_FILTER,
    payload: { key, date }
  };
}

export function changeHomeSelected(id: string): Dispatch<{}> {
  return function(dispatch: Dispatch<{}>): void {
    if (window.innerWidth <= 960) {
      dispatch(toggleDrawer());
    }
    dispatch(setHomeDrawerSelected(id));
  };
}

export function changeInvoiceSelected(id: string): Dispatch<{}> {
  return function(dispatch: Dispatch<{}>): void {
    if (window.innerWidth <= 960) {
      dispatch(toggleDrawer());
    }
    dispatch(setInvoiceDrawerSelected(id));
  };
}

export function clearNewInvoice(): Dispatch<{}> {
  return function(dispatch: Dispatch<{}>): void {
    dispatch(setInvoiceFilter('start', ''));
    dispatch(setInvoiceFilter('end', ''));
  };
}
