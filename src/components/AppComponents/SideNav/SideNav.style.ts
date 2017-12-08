import { colors, sideNavWidth } from '../../../assets/styleVariables';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SideNavContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: ${sideNavWidth};
  height: 100vh;
  position: fixed;
  border-right: 2px solid #2196F3;
  background-color: ${colors.background};
  z-index: 1501;
`;

// tslint:disable-next-line:no-any
export const MenuButton = styled(Button as any)`
  width: 100%; 
  color: #fff !important;
  border-radius: 0 !important;
  box-shadow: none !important;
`;

// tslint:disable-next-line:no-any
export const SideNavButton = styled(Button as any)`
    width: ${sideNavWidth};
    min-width: ${sideNavWidth};
    height: ${sideNavWidth};
    border-radius: 0;
    margin: 0;
    background-color: ${colors.background};
    color: ${colors.text} !important;
    span {
      display: flex !important;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
`;

export const SideNavLink = styled(NavLink)`
  &.nav-item-active {
    color: ${colors.primary} !important;
    &:after {
      content: "";
      position: absolute; 
      right: 0;
      top: calc(50% - 10px);
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid ${colors.primary};
    }
  }
`;

// tslint:disable-next-line:no-any
export const SideNavIcon = styled(Icon as any)`
  font-size: 2.5em;
`;

export const SideNavLabel = styled.span`
  margin-top: 6px;
  font-size: 0.7rem;
`;
