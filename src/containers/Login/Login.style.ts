// tslint:disable:no-any
import styled from 'styled-components';
import Card from 'material-ui/Card';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LoginCard = styled(Card as any)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  padding: 16px;
`;