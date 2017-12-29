// tslint:disable
import * as React from 'react';
import * as _ from 'lodash';
import { PieChart, Pie, Label, Cell, LineChart, XAxis, YAxis, Line, Tooltip, ReferenceLine } from 'recharts';
import { LoadingSpinner } from '../../SharedComponents/LoadingSpinner';
import { NoInvoiceWrapper, TotalsWrapper, PieWrapper } from './NoInvoice.style';

import { Invoice, Result, LogProject, Log } from '../../../constants/types';

interface Props {
  invoices: Result<Invoice[]>; 
}
interface PerProject {
  name: string;
  color: string;
  hours: number;
  pay: number;
}

export const NoInvoice = (props: Props) => {
  let invoices: Invoice[] = [];
  let perProject: PerProject[];
  if (!props.invoices.loading) {

    const projects: Partial<LogProject & { rate: number }>[] = _.uniqBy(
      _.flatMap(props.invoices.data, inv => inv.logs.map(l => ({ name: l.project.name, color: l.project.color, rate: inv.rate }))),
      'name'
    )
    const allLogs = _.flatMap(props.invoices.data, (inv) => inv.logs);

    perProject = projects.map(p => {
      return {
        name: p.name,
        color: p.color,
        hours: allLogs
          .filter(l => l.project.name === p.name)
          .reduce((a: number, b: Log) => a + b.duration, 0),
        pay: p.rate * allLogs
        .filter(l => l.project.name === p.name)
        .reduce((a: number, b: Log) => a + b.duration, 0)
      };
    });
    
    props.invoices.data.forEach(inv => invoices.unshift(inv));
    invoices = invoices.filter(i => i.date !== '1970-01-01');
  }
  return (
    <div>
      {!props.invoices.loading && 
        <NoInvoiceWrapper>
          <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <PieWrapper>
              <h2>Total Hours Invoiced Per Project</h2>
              <PieChart 
                height={(window.innerHeight - 350) / 2} 
                width={(window.innerWidth - 600) / 2}
              >
                <Pie 
                  data={perProject} 
                  dataKey="hours" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%"
                  outerRadius="60%"
                  label={({...args}: PerProject & Label) => `${args.name}: ${args.hours} hours`}
                >
                  {perProject.map((project, index) => (
                    <Cell key={`cell-${index}`} fill={project.color}/>
                  ))
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
            </PieWrapper>
            <PieWrapper>
              <h2>Total Dollars Invoiced Per Project</h2>
              <PieChart 
                height={(window.innerHeight - 350) / 2} 
                width={(window.innerWidth - 600) / 2}
              >
                <Pie 
                  data={perProject} 
                  dataKey="pay" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%"
                  outerRadius="60%"
                  label={({...args}: PerProject & Label) => `${args.name}: $${args.pay}`}
                >
                  {Object.values(perProject).map((project, index) => (
                    <Cell key={`cell-${index}`} fill={project.color}/>
                  ))
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
            </PieWrapper>
          </div>
          <h2>Total Hours Invoiced Per Week</h2>
          <LineChart 
            data={invoices}
            height={(window.innerHeight - 350) / 2} 
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