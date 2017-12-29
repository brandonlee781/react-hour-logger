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
import { StatsWrapper } from './InvoiceStats.style';

interface Props {
  invoice: Invoice;
}

interface Args extends Label {
  name?: string;
  date?: string;
  hours: number;
}

export const InvoiceStats = (props: Props) => {
  const projects: Partial<LogProject>[] = 
    _.uniqBy(props.invoice.logs.map(l => ({name: l.project.name, color: l.project.color})), 'name');
  const dates: string[] = _.uniq(props.invoice.logs.map(l => l.date)).sort();

  const perProject = projects.map(p => {
    return {
      name: p.name,
      color: p.color,
      hours: props.invoice.logs
        .filter(l => l.project.name === p.name)
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
      if (obj[p.name]) {
        obj[p.name] += props.invoice.logs
          .filter(l => l.project.name === p.name)
          .filter(l => l.date === d)
          .reduce((a: number, b: Log) => a + b.duration, 0);
      } else {
        obj[p.name] = props.invoice.logs
          .filter(l => l.project.name === p.name)
          .filter(l => l.date === d)
          .reduce((a: number, b: Log) => a + b.duration, 0);
      }
    });
    return obj;
  });

  return (
    <StatsWrapper>
      <h2>Total Hours per Project</h2>
      <PieChart height={(window.innerHeight - 350) / 2} width={window.innerWidth - 503}>
        <Pie 
          data={perProject} 
          dataKey="hours" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          label={({...args}: Args) => `${args.name}: ${args.hours} hours`}
        >
          {perProject.map((project, index) => (
            <Cell key={`cell-${index}`} fill={project.color}/>
          ))
          }
        </Pie>
        <Tooltip/>
      </PieChart>
      <h2>Total Hours Invoiced Per Day of the Week</h2>
      <LineChart 
        data={perDay}
        height={(window.innerHeight - 350) / 2} 
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
    </StatsWrapper>
  );
};