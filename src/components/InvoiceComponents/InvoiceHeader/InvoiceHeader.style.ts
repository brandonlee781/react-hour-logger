import styled from 'styled-components';
import { sideNavWidth } from '../../../assets/styleVariables';
import Button from 'material-ui/Button';

export const InvoiceHeaderWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: ${sideNavWidth};
  width: 100%;
  padding: 0 4em;
  border-bottom: 1px solid rgba(0,0,0,0.12); 
`;

export const InvoiceTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
`;

// tslint:disable-next-line:no-any
export const InvoiceIconButton = styled(Button as any)`
border-radius: 50% !important;
height: 4rem !important;
width: 4rem !important;
min-width: 4rem !important;
span {
  font-size: 4rem;
  font-weight: 100;
  font-family: 'Roboto', sans-serif !important;
}
`;