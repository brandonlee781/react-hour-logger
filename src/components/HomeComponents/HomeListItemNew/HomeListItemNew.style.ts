import styled from 'styled-components';
import { Grid } from 'material-ui';
import { colors } from '../../../assets/styleVariables';

export const MenuHeading = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 8px 16px;
  background-color: ${colors.primary};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
`;

export const MenuActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 8px;
`;

// tslint:disable:no-any
export const IconGrid = styled(Grid as any)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 56px; 
`;