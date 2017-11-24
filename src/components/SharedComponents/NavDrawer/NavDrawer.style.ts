import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';
import { colors, sideNavWidth } from '../../../assets/styleVariables';

// tslint:disable-next-line:no-any
export const BaseDrawer = styled(Drawer as any)`
  & > div {
    width: 378px !important;
    min-width: 378px;
    background-color: ${colors.primary};
    color: #fff;
    border: 0 !important;
  }
`;

export const DrawerHeader = styled.span`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: ${sideNavWidth};
  width: 100%;
  padding: 0 2rem;
  margin: 0 !important;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  font-size: 2.15rem;
  font-weight: 100;
  color: #fff; 
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
`;