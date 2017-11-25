import { ActionType } from '../constants/types';
import { Dispatch } from 'react-redux';
export const SCREEN_SIZE = 'SCREEN_SIZE';
export const SET_HOME_DRAWER = 'SET_HOME_DRAWER';
export const SET_HOME_SELECTED = 'SET_HOME_SELECTED';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_NEW_LOG_FORM = 'TOGGLE_NEW_LOG_FORM';

export function setHomeDrawerSelected(id: string): ActionType<string> {
  return {
    type: SET_HOME_SELECTED,
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

export function changeHomeSelected(id: string): Dispatch<{}> {
  return function(dispatch: Dispatch<{}>): void {
    dispatch(setHomeDrawerSelected(id));
  };
}
