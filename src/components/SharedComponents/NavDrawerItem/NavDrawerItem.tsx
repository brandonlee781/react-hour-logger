import * as React from 'react';
import Icon from 'material-ui/Icon';
import { 
  ItemWrapper,
  ItemText, 
  ItemIcon,
} from './NavDrawerItem.style';
import { Link } from '../../../constants/types';
import { Dispatch } from 'react-redux';

export interface NavDrawerItemProps extends Link {
  changeSelected: (id: string) => Dispatch<void>;
}

export const NavDrawerItem = (props: NavDrawerItemProps) => (
  <ItemWrapper 
    button={true} 
    className={props.selected ? 'selected' : ''}
    onClick={() => props.changeSelected(props.id)}
  >
    <ItemIcon>
      <Icon>{props.icon}</Icon>
    </ItemIcon>
    <ItemText>{props.title}</ItemText>
  </ItemWrapper> 
);