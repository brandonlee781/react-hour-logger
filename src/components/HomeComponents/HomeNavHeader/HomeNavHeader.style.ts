import styled from 'styled-components';

import { sideNavWidth } from '../../../assets/styleVariables';

export const DrawerHeader = styled.span`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: ${sideNavWidth};
  min-height: ${sideNavWidth};
  width: 100%;
  padding: 0;
  margin: 0 !important;
  font-size: 2.15rem;
  font-weight: 100;
  color: #fff; 
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
`;