import { mount, shallow } from 'enzyme';

export interface Project {
  id: string;
  createdAt: string;
  links: [string];
  name: string;
  tasks: [{}];
  updatedAt: string;
}

export interface LogProject {
  id: string;
  name: string;
  color: string;
}

export interface Log {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: number;
  project: LogProject;
  note?: string;
}

export interface Link {
  icon: string;
  id: string;
  title: string;
  selected: boolean;
}

export interface Invoice {
  id: string;
  number: number;
  hours: number;
  rate: number;
  date: string;
  logs: Log[];
}

interface ApolloState {
  // tslint:disable-next-line:no-any
  [key: string]: any;
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
}
export type LogStateType = LogState;

interface UIState {
  drawerOpen: boolean;
  home: {
    selected: string;
    newLogFormShown: boolean;
  };
  invoice: {
    selected: string;
    tab: 'hours' | 'invoice';
    newInvoiceFormShown: boolean;
    start: string;
    end: string;
  };
}
export type UIStateType = UIState;

interface StoreState {
  apollo: ApolloState;
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

export interface Result<T> {
  error: Error;
  loading: boolean;
  data: T;
  fetchMore?: () => void;
}

type enzMount = typeof mount;
export interface Mount extends enzMount {
  attachTo: HTMLElement;
  cleanUp: Function;
}

type enzShallow = typeof shallow;
export interface Shallow extends enzShallow {}