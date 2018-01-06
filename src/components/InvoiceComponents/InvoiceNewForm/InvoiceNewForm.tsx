import * as React from 'react';
import * as moment from 'moment';
import { Popover } from 'material-ui';
import { MenuHeading, MenuActions } from './InvoiceNewForm.style';
import { Button, FormControl, InputLabel, Grid, Select, MenuItem, Input } from 'material-ui';
import { DatePicker } from 'material-ui-pickers';
import { ActionType, Result, Project } from '../../../constants/types';
import { FilterKey } from '../../../actions/ui';

export interface Props {
  newInvoiceFormShown: boolean;
  start: string;
  end: string;
  project: string;
  projects: Result<Project[]>;
  toggleNewInvoiceForm: () => void;
  setInvoiceFilter: (key: FilterKey, val: string) => ActionType<{}>;
  clearNewInvoice: () => void;
}

export const InvoiceNewForm = (props: Props) => (
  <Popover
    open={props.newInvoiceFormShown}
    anchorPosition={{ top: 0, left: (window.innerWidth - 500) }}
    anchorReference="anchorPosition"
  >
    <MenuHeading>
      <span>Filter Logs</span>
    </MenuHeading>
    <Grid container={true} spacing={8} direction="row" wrap="nowrap" style={{padding: '8px'}}>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="project-select">Project</InputLabel>
          <Select
            value={props.project}
            onChange={(project) => props.setInvoiceFilter('project', project.target.value)}
            autoWidth={true}
            name="project"
            input={<Input id="project-select"/>}
            error={!!props.projects.error}
          >
            <MenuItem value="">-- Select --</MenuItem>
            {props.projects.data.map((project, ind) => (
              <MenuItem key={ind} value={project.id}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    <Grid container={true} spacing={8} direction="row" wrap="nowrap" style={{padding: '8px'}}>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="start-input" shrink={!!props.start}>Start Date</InputLabel>
          <DatePicker
            id="start-input"
            value={moment(props.start, 'YYYY-MM-DD')}
            fullWidth={true}
            invalidLabel={''}
            onChange={(date: moment.Moment) => props.setInvoiceFilter('start', date.format('YYYY-MM-DD'))}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
      </Grid>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="end-input" shrink={!!props.end}>End Date</InputLabel>
          <DatePicker
            id="end-input"
            value={moment(props.end, 'YYYY-MM-DD')}
            fullWidth={true}
            invalidLabel={''}
            onChange={(date: moment.Moment) => props.setInvoiceFilter('end', date.format('YYYY-MM-DD'))}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
      </Grid>
    </Grid>
    <MenuActions>
      <Button color="accent" onClick={props.clearNewInvoice}>Clear</Button>
      <Button onClick={props.toggleNewInvoiceForm}>Close</Button>
    </MenuActions>
  </Popover>
);