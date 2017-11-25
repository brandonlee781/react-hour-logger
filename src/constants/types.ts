import { mount, shallow } from 'enzyme';

export interface Project {
  _id: string;
  createdAt: string;
  links: [string];
  name: string;
  tasks: [{}];
  updatedAt: string;
}

export interface Log {
  _id: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: number;
  project: string;
  note?: string;
}

export interface Link {
  icon: string;
  id: string;
  title: string;
  selected: boolean;
}

interface ProjectState {
  isFetching: boolean;
  didFail: boolean;
  items: Project[];
}
export type ProjectStateType = ProjectState;

interface LogState {
  isFetching: boolean;
  didFail: boolean;
  items: Log[];
  filtered: Log[];
}
export type LogStateType = LogState;

interface UIState {
  drawerOpen: boolean;
  home: {
    selected: string;
  };
}
export type UIStateType = UIState;

interface StoreState {
  projects: ProjectState;
  logs: LogState;
  ui: UIState;
}
export type StoreStateType = StoreState;

interface Action<T> {
  type: string;
  payload?: T;
}
export type ActionType<T> = Action<T>;

type enzMount = typeof mount;
export interface Mount extends enzMount {
  attachTo: HTMLElement;
  cleanUp: Function;
}

type enzShallow = typeof shallow;
export interface Shallow extends enzShallow {}