import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { Project } from '../constants/types';
import { setHomeDrawerLinks } from './ui';
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECTS_FAILED = 'RECEIVE_PROJECTS_FAILED';

export interface ProjectAction {
  type: string;
  projects: Project[];
  receivedAt: number;
}

export function requestProjects() {
  return {
    type: REQUEST_PROJECTS
  };
}

export function receieveProjects(projects: {}) {
  return {
    type: RECEIVE_PROJECTS,
    payload: projects,
  };
}

export function recieveProjectsFailed() {
  return {
    type: RECEIVE_PROJECTS_FAILED,
  };
}

export function fetchProjects() {
  return async function(dispatch: Dispatch<{}>) {
    try {
      dispatch(requestProjects());
      const res: AxiosResponse = await axios.get('https://www.branlee.me/api/v1/projects', {
        headers: {
          'Authorization': 'Bearer 935dce7e662f66a454041422ccfab4289deebf4c',
        },
      });
      dispatch(receieveProjects(res.data));
      dispatch(setHomeDrawerLinks(res.data));
    } catch (err) {
      console.error(err);
      dispatch(recieveProjectsFailed());
    }
  };
}