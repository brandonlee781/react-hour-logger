import * as React from 'react';
import { Invoice } from '../../../constants/types';
import { InvoiceDocWrapper, DocViewWrapper } from './InvoiceDocument.style';
import { InvoiceDocumentDetails } from '../InvoiceDocumentDetails';
import { InvoiceDocumentView } from '../InvoiceDocumentView';

interface Props {
  invoice: Invoice;
}

export const InvoiceDocument = (props: Props) => (
  <InvoiceDocWrapper>
    <InvoiceDocumentDetails {...props.invoice} />
    <DocViewWrapper className="no-print">
      <InvoiceDocumentView {...props.invoice}/>
    </DocViewWrapper>
    <div className="no-screen" style={{ width: '100%' }}>
      <InvoiceDocumentView {...props.invoice}/>
    </div>
  </InvoiceDocWrapper>
);