import * as React from 'react';
import { Tabs } from 'material-ui';
import { InvoiceTab } from './SelectedInvoice.style';

import { InvoiceTable } from '../InvoiceTable';
import { InvoiceDocument } from '../InvoiceDocument';
import { InvoiceStats } from '../InvoiceStats';

import { Invoice } from '../../../constants/types';

interface Props {
  tab: string;
  selectedInvoice: Invoice;
  setInvoiceTab: (val: string) => void;
}

export const SelectedInvoice = (props: Props) => (
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
      <InvoiceTab value="stats" label="stats"/>
    </Tabs>
  
    {props.tab === 'hours' && <InvoiceTable invoice={props.selectedInvoice}/>}
    {props.tab === 'invoice' && <InvoiceDocument invoice={props.selectedInvoice}/>}
    {props.tab === 'stats' && <InvoiceStats data={props.selectedInvoice} loading={false}/>}
  </div>
);