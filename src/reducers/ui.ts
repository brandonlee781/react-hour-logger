import * as Immutable from 'seamless-immutable';
import { ImmutableArray, ImmutableObject } from 'seamless-immutable';
import { SET_HOME_DRAWER, SET_HOME_SELECTED } from '../actions/ui';
import { Link, ActionType, UIStateType } from '../constants/types';
import { TOGGLE_DRAWER } from '../actions/index';

const iState: UIStateType = {
  drawerOpen: false,
  homeDrawer: {
    links: [{
      id: '',
      title: 'Recent Log Entries',
      icon: '',
      selected: true,
    }]
  }
};

export const initialState = Immutable.from(iState);

// tslint:disable-next-line:no-any
export const uiReducer = (state = initialState, action: ActionType<any>): UIStateType => {
  switch (action.type) {
    case SET_HOME_DRAWER:
      let links: Link[] = action.payload;
      links.unshift(iState.homeDrawer.links[0]);
      return state
        .setIn(['homeDrawer', 'links'], links);
    case SET_HOME_SELECTED:
      // tslint:disable-next-line:no-any
      let currentLinks: ImmutableObject<any> = state.getIn(['homeDrawer', 'links']);
      let newLinks: ImmutableArray<Link> = 
        currentLinks.flatMap((link: Link): ImmutableObject<Link> => {
          if (link.id === action.payload) {
            return Immutable(link).set('selected', true); 
          } else {
            return Immutable(link).set('selected', false);
          }
        });
      return state.setIn(['homeDrawer', 'links'], newLinks);
    case TOGGLE_DRAWER:
      return state.update('drawerOpen', x => !x);
    default:
      return state;
  }
};
