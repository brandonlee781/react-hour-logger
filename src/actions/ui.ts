import { ActionType } from '../constants/types';
import { Dispatch } from 'react-redux';
import { filterLogs } from './logs';
export const SCREEN_SIZE = 'SCREEN_SIZE';
export const SET_HOME_DRAWER = 'SET_HOME_DRAWER';
export const SET_HOME_SELECTED = 'SET_HOME_SELECTED';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

// export function setHomeDrawerLinks(projects: Project[]) {
//   const links: Link[] = projects.map((project: Project) => {
//     return {
//       id: project._id,
//       title: project.name,
//       icon: 'folder_open',
//       selected: false,
//     };
//   });
//   return {
//     type: SET_HOME_DRAWER,
//     payload: links
//   };
// }

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

export function changeHomeSelected(id: string): Dispatch<{}> {
  return function(dispatch: Dispatch<{}>): void {
    dispatch(setHomeDrawerSelected(id));
    dispatch(filterLogs(id));
  };
}
