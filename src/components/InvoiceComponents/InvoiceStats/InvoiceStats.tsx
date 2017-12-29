import * as React from 'react';
import * as _ from 'lodash';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  // ReferenceLine
} from 'recharts';
import { Invoice, Log, LogProject } from '../../../constants/types';
import { StatsWrapper, TotalsWrapper, PieWrapper } from './InvoiceStats.style';
import { LoadingSpinner } from '../../SharedComponents/LoadingSpinner';

interface Props {
  data: Invoice | Invoice[];
  loading: boolean;
}

interface FilteredData {
  label: string;
  hours: number;
  color?: string;
  pay?: number;
}

export const InvoiceStats = (props: Props) => {
  let perProject: FilteredData[] ;
  let perDate: FilteredData[];
  let projects: Partial<LogProject & { rate: number }>[];
  let invoices: Invoice[];
  if (!props.loading) {
    invoices = Array.isArray(props.data) ? props.data : [props.data];

    projects = _.uniqBy(
      invoices.map(inv => {
        return inv.logs.map(l => ({ name: l.project.name, color: l.project.color, rate: inv.rate }));
      })[0],
      'name'
    );
    const allLogs = _.flatMap(invoices, (inv) => inv.logs);
    const dates: string[] = _.uniq(
      invoices.map(inv => {
        return inv.logs.map(l => l.date);
      })[0]
    ).sort();

    perProject = projects.map(p => {
      return {
        label: p.name,
        color: p.color,
        hours: allLogs
          .filter(l => l.project.name === p.name)
          .reduce((a: number, b: Log) => a + b.duration, 0),
        pay: p.rate * allLogs
        .filter(l => l.project.name === p.name)
        .reduce((a: number, b: Log) => a + b.duration, 0), 
      };
    });

    perDate = dates.map(d => {
      const obj = {
        label: d,
        hours: allLogs
          .filter(l => l.date === d)
          .reduce((a: number, b: Log) => a + b.duration, 0),
      };
      projects.forEach(p => {
        if (obj[p.name]) {
          obj[p.name] += allLogs
            .filter(l => l.project.name === p.name)
            .filter(l => l.date === d)
            .reduce((a: number, b: Log) => a + b.duration, 0);
        } else {
          obj[p.name] = allLogs
            .filter(l => l.project.name === p.name)
            .filter(l => l.date === d)
            .reduce((a: number, b: Log) => a + b.duration, 0);
        }
      });
      return obj;
    });
    
    return (
      <StatsWrapper>
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
          <PieWrapper>
            <h2>Total Hours per Project</h2>
            <PieChart 
              height={(window.innerHeight - 400) / 2}  
              width={(window.innerWidth - 600) / 2}
            >
              <Pie 
                data={perProject} 
                dataKey="hours" 
                nameKey="label" 
                cx="50%" 
                cy="50%" 
                outerRadius="60%"
                label={({...args}: FilteredData & Label) => `${args.label}: ${args.hours} hours`}
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
            <h2>Total Dollars per Project</h2>
            <PieChart 
              height={(window.innerHeight - 400) / 2} 
              width={(window.innerWidth - 600) / 2}
            >
              <Pie 
                data={perProject} 
                dataKey="pay" 
                nameKey="label" 
                cx="50%" 
                cy="50%" 
                outerRadius="60%"
                label={({...args}: FilteredData & Label) => `${args.label}: $${args.pay}`}
              >
                {perProject.map((project, index) => (
                  <Cell key={`cell-${index}`} fill={project.color}/>
                ))
                }
              </Pie>
              <Tooltip/>
            </PieChart>
          </PieWrapper>

        </div>
        <h2>Total Hours Invoiced Per Day of the Week</h2>
        <LineChart 
          data={perDate}
          height={(window.innerHeight - 400) / 2} 
          width={window.innerWidth - 600} 
          margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          {/* <ReferenceLine 
            y={Object.values(perDay).reduce((a, b: Args) => a + b.hours, 0) / invoices.length} 
            stroke="red" 
          /> */}
          <Line type="monotone" dataKey="hours" stroke="#2196f3"/>
          {projects.map((proj, ind) => (
            <Line key={ind} type="monotone" dataKey={proj.name} stroke={proj.color}/>
          ))}
        </LineChart>
        <TotalsWrapper>
          <span>Total Hours: {invoices.reduce((a, b) => a + b.hours, 0)} </span>
          <span>Average Hours Per {invoices.length >= 2 ? 'Week' : 'Day'}: {
            (invoices.reduce((a, b) => a + b.hours, 0) / invoices.length).toFixed(2)
          } </span>
          <span>Total Pay: ${invoices.reduce((a, b) => a + (b.hours * b.rate ) , 0)} </span>
          <span>Total to set aside for taxes: ${(invoices.reduce((a, b) => a + (b.hours * b.rate ) , 0)) * .25} </span>
        </TotalsWrapper>
      </StatsWrapper>
    );
  } else {
    return ( <LoadingSpinner show={true}/>);
  }
};