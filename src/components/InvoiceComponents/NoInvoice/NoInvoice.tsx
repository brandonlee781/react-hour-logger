// tslint:disable
import * as React from 'react';
import { PieChart, Pie, Label, Cell, LineChart, XAxis, YAxis, Line, Tooltip, ReferenceLine } from 'recharts';
import { LoadingSpinner } from '../../SharedComponents/LoadingSpinner';
import { NoInvoiceWrapper, TotalsWrapper } from './NoInvoice.style';

import { Invoice, Result } from '../../../constants/types';

interface Props {
  invoices: Result<Invoice[]>; 
}
interface Args extends Label {
  name: string;
  hours: number;
}

const colors = () => '#'+Math.floor(Math.random()*16777215).toString(16);

export const NoInvoice = (props: Props) => {
  const perProject = {};
  let invoices: Invoice[] = [];
  if (!props.invoices.loading) {
    props.invoices.data.forEach(inv => invoices.unshift(inv));
    invoices = invoices.filter(i => i.date !== '1970-01-01');
    props.invoices.data.forEach(inv => {
      inv.logs.forEach(log => {
        if (perProject[log.project.name]) {
          perProject[log.project.name].hours += log.duration;
        } else {
          perProject[log.project.name] = {
            name: log.project.name,
            hours: log.duration,
          };
        }
      });
    });
  }
  return (
    <div>
      {!props.invoices.loading && 
        <NoInvoiceWrapper>
          <h2>Total Hours Invoiced Per Project</h2>
          <PieChart height={400} width={window.innerWidth - 503}>
            <Pie 
              data={Object.values(perProject)} 
              dataKey="hours" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              label={({...args}: Args) => `${args.name}: ${args.hours} hours`}
            >
              {Object.values(perProject).map((project, index) => (
                <Cell key={`cell-${index}`} fill={colors()}/>
              ))
              }
            </Pie>
            <Tooltip/>
          </PieChart>
          <h2>Total Hours Invoiced Per Week</h2>
          <LineChart 
            data={invoices}
            height={400} 
            width={window.innerWidth - 600} 
            margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <ReferenceLine 
              y={invoices.reduce((a, b) => a + b.hours, 0) / invoices.length} 
              stroke="red" 
            />
            <Line type="monotone" dataKey="hours" stroke="#2196f3"/>
          </LineChart>
          <TotalsWrapper>
            <span>Total Hours: {invoices.reduce((a, b) => a + b.hours, 0)} </span>
            <span>Average Hours Per Week: {(invoices.reduce((a, b) => a + b.hours, 0) / invoices.length).toFixed(2)} </span>
            <span>Total Pay: ${invoices.reduce((a, b) => a + (b.hours * b.rate ) , 0)} </span>
            <span>Total to set aside for taxes: ${(invoices.reduce((a, b) => a + (b.hours * b.rate ) , 0)) * .25} </span>
          </TotalsWrapper>
        </NoInvoiceWrapper>
      }
      {props.invoices.loading && <LoadingSpinner show={true}/>}
    </div>
  )
};