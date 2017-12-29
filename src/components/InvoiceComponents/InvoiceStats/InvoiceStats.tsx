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
import { Invoice, Log } from '../../../constants/types';

interface Props {
  invoice: Invoice;
}

interface Args extends Label {
  name?: string;
  date?: string;
  hours: number;
}

const colors = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

export const InvoiceStats = (props: Props) => {
  const projects: string[] = _.uniq(props.invoice.logs.map(l => l.project.name));
  const dates: string[] = _.uniq(props.invoice.logs.map(l => l.date)).sort();

  const perProject = projects.map(p => {
    return {
      name: p,
      hours: props.invoice.logs
        .filter(l => l.project.name === p)
        .reduce((a: number, b: Log) => a + b.duration, 0)
    };
  });
  const perDay = dates.map(d => {
    const obj = {
      date: d,
      hours: props.invoice.logs
        .filter(l => l.date === d)
        .reduce((a: number, b: Log) => a + b.duration, 0),
    };
    projects.forEach(p => {
      if (obj[p]) {
        obj[p] += props.invoice.logs
          .filter(l => l.project.name === p)
          .filter(l => l.date === d)
          .reduce((a: number, b: Log) => a + b.duration, 0);
      } else {
        obj[p] = props.invoice.logs
          .filter(l => l.project.name === p)
          .filter(l => l.date === d)
          .reduce((a: number, b: Log) => a + b.duration, 0);
      }
    });
    return obj;
  });

  return (
    <div>
      <h2>Total Hours per Project</h2>
      <PieChart height={400} width={window.innerWidth - 503}>
        <Pie 
          data={perProject} 
          dataKey="hours" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          label={({...args}: Args) => `${args.name}: ${args.hours} hours`}
        >
          {perProject.map((project, index) => (
            <Cell key={`cell-${index}`} fill={colors()}/>
          ))
          }
        </Pie>
        <Tooltip/>
      </PieChart>
      <h2>Total Hours Invoiced Per Day of the Week</h2>
      <LineChart 
        data={perDay}
        height={400} 
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
          <Line key={ind} type="monotone" dataKey={proj} stroke={colors()}/>
        ))}
      </LineChart>
    </div>
  );
};