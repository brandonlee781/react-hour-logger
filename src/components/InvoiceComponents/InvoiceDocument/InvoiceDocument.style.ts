import styled from 'styled-components';
import Paper from 'material-ui/Paper';

export const InvoiceDocWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  max-width: 100%;
  padding: 8px;
`;

// tslint:disable-next-line:no-any
export const DocViewWrapper = styled(Paper as any)`
  display: flex;
  align-self: center;
  width: 100%;
  max-width: 650px;
  margin-top: 16px;
`;