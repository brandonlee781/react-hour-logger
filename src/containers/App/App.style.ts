import styled, { keyframes } from 'styled-components';
import { sideNavWidth } from '../../assets/styleVariables';

export const AppContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const AppBody = styled.div`
  width: 100%;
  margin-left: ${sideNavWidth}; 
`;

export const AppHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  /* color: white; */
  color: ${ props => props.color ? props.color : 'white' };
`;

export const AppIntro = styled.div`
  font-size: large;
`;

export const AppLogoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const AppLogo = styled.img`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 80px;
`;
