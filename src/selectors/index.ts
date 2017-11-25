import { createSelector } from 'reselect';
import { StoreStateType, Project, Log } from '../constants/types';

const getHomeSelection = (state: StoreStateType): string => state.ui.home.selected;
const getProjects = (state: StoreStateType): Project[] => state.projects.items;
const getLogs = (state: StoreStateType): Log[] => state.logs.items;

export const getHomeLinks = createSelector(
  [getHomeSelection, getProjects],
  (selection, projects) => {
    let links = projects.map(project => ({
      id: project.name.toLowerCase(),
      title: project.name,
      icon: 'folder_open',
      selected: project.name.toLowerCase() === selection ? true : false
    }));
    return [
      {id: '', title: 'Recent Log Entries', icon: '', selected: selection === ''},
      ...links
    ];
  }
);

export const filterHomeEntries = createSelector(
  [getHomeSelection, getLogs],
  (selection, logs) => {
    if (selection !== '') {
      return logs.filter(l => l.project.toLowerCase() === selection);
    } else {
      return logs;
    }
  }
);