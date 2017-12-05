import styled from 'styled-components';
import { ListItem, ListItemIcon } from 'material-ui/List';

// tslint:disable-next-line:no-any
export const ItemWrapper = styled(ListItem as any)`
  display: flex;
  align-items: center;
  height: 5rem;
  border-bottom: 1px solid rgba(255,255,255,0.3) !important;
  cursor: pointer;
  &.selected {
    &:after {
      content:"";
      position:absolute; 
      right: 0;
      top: calc(2.5rem - 10px);
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #fff;
    }
  }
`;

export const ItemText = styled.span`
  font-size: 0.8em;
  font-weight: 300;
  letter-spacing: 0.6px;
  color: #fff; 
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
`;

// tslint:disable-next-line:no-any
export const ItemIcon = styled(ListItemIcon as any)`
  color: #fff !important;
`;
