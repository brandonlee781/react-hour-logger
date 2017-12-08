import * as React from 'react';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { DetailWrapper } from './InvoiceDocumentDetails.style';
import { Invoice } from '../../../constants/types';

interface Props extends Invoice {}

export const InvoiceDocumentDetails = (props: Props) => (
  <DetailWrapper className="no-print">
    <FormControl>
      <InputLabel htmlFor="date">Invoice Date</InputLabel>
      <Input
        id="date"
        value={props.date}
      />
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="rate">PayRate</InputLabel>
      <Input
        id="rate"
        value={props.rate}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="hours">Total Hours</InputLabel>
      <Input
        id="hours"
        value={props.hours}
      />
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="pay">Total Pay</InputLabel>
      <Input
        id="pay"
        value={props.hours * props.rate}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </FormControl>
  </DetailWrapper>
);