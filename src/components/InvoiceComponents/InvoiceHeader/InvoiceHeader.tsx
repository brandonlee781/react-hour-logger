import { Invoice, Link, Result } from '../../../constants/types';
import * as React from 'react';
import { InvoiceHeaderWrapper, InvoiceTitle, InvoiceIconButton } from './InvoiceHeader.style';
import { Create, FilterList, FileDownload, Print } from 'material-ui-icons';

export interface Props {
  invoices?: Result<Invoice[]>;
  links?: Result<Link[]>;
  selectedInvoice?: Invoice;
  newInvoice: boolean;
  tab?: string;
  downloadCsv?: (invoice: Invoice) => void;
  toggleNewInvoiceForm?: () => void;
  create?: () => void;
}

export const InvoiceHeader = (props: Props) => (
  <InvoiceHeaderWrapper className="no-print">
    <InvoiceTitle>
      { props.invoices.loading ?
        'Create New Invoice' :
        (props.links.data.filter(l => l.selected))[0].title
      }
    </InvoiceTitle>
    <div>
      { !props.selectedInvoice && 
        <InvoiceIconButton
          id="toggleInvoiceFormButton"
          onClick={props.toggleNewInvoiceForm}
        >
          <FilterList/>
        </InvoiceIconButton>
      }
      { !props.selectedInvoice && props.newInvoice &&
        <InvoiceIconButton
          id="saveInvoiceButton"
          color="primary"
          onClick={props.create}
        >
          <Create/>
        </InvoiceIconButton>
      }
    </div>
    { props.selectedInvoice && props.tab === 'hours' &&
      <InvoiceIconButton
        id="downloadCsvButton"
        onClick={() => props.downloadCsv(props.invoices.data.filter(i => i.id === props.selectedInvoice.id)[0])}
      >
        <FileDownload/>
      </InvoiceIconButton>
    }
    { props.selectedInvoice && props.tab === 'invoice' &&
      <InvoiceIconButton
        id="printPdfButton"
        onClick={() => window.print()}
      >
        <Print/>
      </InvoiceIconButton>
    }
  </InvoiceHeaderWrapper>
);