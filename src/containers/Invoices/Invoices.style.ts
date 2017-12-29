import styled, { StyledFunction } from 'styled-components';

export const InvoiceContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100vh;
`;

interface InvoiceBodyProps {
  mobile?: boolean;
}
const bodyDiv: StyledFunction<InvoiceBodyProps & React.HTMLProps<HTMLInputElement>> = styled.div;

export const InvoiceBody = bodyDiv`
  width: 100%;
  margin-left: ${p => p.mobile ? '378px' : '0'};
  @media print {
    margin-left: 0;
  }
`;
