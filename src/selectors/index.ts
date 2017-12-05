import { createSelector } from 'reselect';
import { StoreStateType, Project, Log } from '../constants/types';

const getHomeSelection = (state: StoreStateType): string => state.ui.home.selected;
const getProjects = (state: StoreStateType): Project[] => state.apollo.$ROOT_QUERY 
  ? state.apollo.$ROOT_QUERY.allProjects.projects 
  : [];
const getLogs = (state: StoreStateType): Log[] => state.logs.items;

export const getHomeLinks = createSelector(
  [getHomeSelection, getProjects],
  (selection, projects) => {
    let links = projects.map(project => ({
      id: project.id,
      title: project.name,
      icon: 'folder_open',
      selected: project.id === selection ? true : false
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
      return logs.filter(l => l.project.name.toLowerCase() === selection);
    } else {
      return logs;
    }
  }
);