import styled, { StyledFunction } from 'styled-components';
import { Tab } from 'material-ui/Tabs';

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

// tslint:disable-next-line:no-any
export const InvoiceTab = styled(Tab as any)`
  max-width: 1000px !important;
  width: 50%;
`;