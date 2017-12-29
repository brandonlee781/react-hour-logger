import * as React from 'react';
import { Tabs } from 'material-ui';
import { InvoiceTab } from './NewInvoice.style';

import { InvoiceTable } from '../InvoiceTable';
import { InvoiceDocument } from '../InvoiceDocument';
import { LoadingSpinner } from '../../SharedComponents/LoadingSpinner';

import { Invoice, Result } from '../../../constants/types';

interface Props {
  tab: string;
  newInvoice: Result<Invoice>;
  setInvoiceTab: (val: string) => void;
}

export const NewInvoice = (props: Props) => (
  <div>
    <Tabs 
      value={props.tab} 
      onChange={(e, val) => props.setInvoiceTab(val)}
      indicatorColor="primary"
      fullWidth={true}
      centered={true}
      className="no-print"
    >
      <InvoiceTab value="hours" label="Hours"/>
      <InvoiceTab value="invoice" label="Invoice"/>
    </Tabs>
    {!props.newInvoice.loading &&
      <div>
        {props.tab === 'hours' && <InvoiceTable invoice={props.newInvoice.data}/>}
        {props.tab === 'invoice' && <InvoiceDocument invoice={props.newInvoice.data}/>}
      </div>
    }
    {props.newInvoice.loading && <LoadingSpinner show={true}/>}
  </div>
);