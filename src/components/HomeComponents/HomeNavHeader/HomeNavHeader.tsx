import { DateRange, List } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreStateType } from '../../../constants/types';
import { DrawerHeader } from './HomeNavHeader.style';

import { toggleContent } from '../../../actions';

interface ReduxProps {
  list?: boolean;
}
const mapStateToProps = (state: StoreStateType): ReduxProps => {
  return {
    list: state.ui.home.list,
  };
};

interface DispatchProps {
  toggleContent: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    toggleContent: () => dispatch(toggleContent())
  };
};

interface Props extends ReduxProps, DispatchProps {
  title?: string;
}
export const HomeNavHeaderComponent = (props: Props) => (
  <DrawerHeader>
    <span>{props.title}</span>
    <IconButton color="contrast" onClick={() => props.toggleContent()}>
      {props.list ? <DateRange/> : <List/>}
    </IconButton>
  </DrawerHeader>
);

export const HomeNavHeader = connect(mapStateToProps, mapDispatchToProps)(HomeNavHeaderComponent);