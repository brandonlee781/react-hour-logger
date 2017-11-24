import * as React from 'react';
import MediaQuery from 'react-responsive';
import List from 'material-ui/List';
import { NavDrawerItem } from '../NavDrawerItem';
import {
  BaseDrawer,
  DrawerHeader
} from './NavDrawer.style';
import { /*ActionType,*/ Link } from '../../../constants/types';
import { sideNavWidth } from '../../../assets/styleVariables';
import withStyles from 'material-ui/styles/withStyles';
import { Dispatch } from 'react-redux';

export interface NavDrawerProps {
  header: string;
  links: Link[];
  linksLoading: boolean;
  classes?: DrawerClasses; 
  drawerOpen: boolean;
  changeSelected: (project: string) => Dispatch<void>;
}

interface DrawerClasses {
  paperAnchorLeft: {
    left: string;
  };
}

const styles: DrawerClasses = {
  paperAnchorLeft: {
    left: sideNavWidth
  }
};

export const NavDrawerClass = (props: NavDrawerProps) => (
    <MediaQuery minWidth={960}>
      {(match) => (
      <BaseDrawer
        type={match ? 'permanent' : 'persistant'}
        anchor="left"
        classes={{
          paperAnchorLeft: props.classes.paperAnchorLeft,
        }} 
        open={props.drawerOpen}
      >
        <DrawerHeader>
          {props.header}
        </DrawerHeader>
        <List disablePadding={true}>
          {props.links.map((link: Link) => (
              <NavDrawerItem 
                key={link.id} 
                {...link} 
                changeSelected={props.changeSelected}
              />
          ))}
        </List>
      </BaseDrawer>
      )}
    </MediaQuery>
);

export const NavDrawer = withStyles(styles)(NavDrawerClass);