// tslint:disable:no-any
import * as React from 'react';
import * as moment from 'moment';
import { Button, FormControl, Grid, MenuItem, Popover, Select } from 'material-ui';
import { AccessTime, Description, Event, FolderOpen } from 'material-ui-icons';
import Input, { InputLabel } from 'material-ui/Input';
import { DatePicker, TimePicker } from 'material-ui-pickers';

import { Project } from '../../../constants/types';
import { IconGrid, MenuActions, MenuHeading } from './HomeListItemNew.style';

interface HomeListItemNewProps {
  open: boolean;
  projects: Project[];
  toggle: () => void;
  currentProject: string;
}

interface FormSectionProps {
  value?: string;
  handleChange: any;
  projects?: Project[];
}
interface FormDateSectionProps {
  value: moment.Moment | string;
  handleChange: any;
}

interface HomeListItemNewState {
  project: string;
  date: moment.Moment | string;
  startTime: moment.Moment | string;
  endTime: moment.Moment | string;
  notes: string;
}

const ProjectSelect = (props: FormSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <FolderOpen style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="project-select">Project</InputLabel>
          <Select
            value={props.value}
            onChange={(event) => props.handleChange(event, 'project')}
            autoWidth={true}
            name="project"
            input={<Input id="project-select"/>}
          >
            <MenuItem value="">-- Select --</MenuItem>
            {props.projects.map((project, ind) => (
              <MenuItem key={ind} value={project.id}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const DateInput = (props: FormDateSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <Event style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="date-input">Date</InputLabel>
          <DatePicker
            id="date-input"
            fullWidth={true}
            invalidLabel={''}
            value={props.value}
            onChange={(date: any) => props.handleChange(date, 'date')}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const StartTimeInput = (props: FormDateSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <AccessTime style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="start-input" required={true}>Start Time</InputLabel>
          <TimePicker
            id="start-input"
            value={props.value}
            fullWidth={true}
            invalidLabel={''}
            format="HH:mm"
            ampm={false}
            onChange={(time: any) => props.handleChange(time, 'startTime')}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const EndTimeInput = (props: FormDateSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <AccessTime style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="end-input" required={true}>End Time</InputLabel>
          <TimePicker
            id="end-input"
            value={props.value}
            fullWidth={true}
            invalidLabel={''}
            format="HH:mm"
            ampm={false}
            onChange={(time: any) => props.handleChange(time, 'endTime')}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const NotesInput = (props: FormSectionProps) => (
  <Grid item={true} xs={12} sm={12}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={1}>
        <Description style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={11}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="notes-input" required={true}>Notes</InputLabel>
          <Input
            id="notes-input"
            type="texts"
            value={props.value}
            onChange={(event: any) => props.handleChange(event, 'notes')}
            inputProps={{
              step: 15000
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

export class HomeListItemNew extends React.Component<HomeListItemNewProps, HomeListItemNewState> {
  baseState: HomeListItemNewState;

  constructor(props: HomeListItemNewProps) {
    super(props);
    this.state = {
      project: props.currentProject,
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps: any) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.project !== this.state.project) {
      this.setState({ project: nextProps.currentProject });
    }
  }

  handleChange = (event: any, prop: any) => {
    if (prop === 'date') {
      this.setState({ [prop]: event });
    } else if (prop === 'startTime' || prop === 'endTime') {
      this.setState({ [prop]: event });
    } else {
      this.setState({ [prop]: event.target.value });
    }
  }

  resetState = () => {
    this.setState(this.baseState);
  }

  toggleMenu = () => {
    this.resetState();
    this.props.toggle();
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorPosition={{ top: 0, left: (window.innerWidth - 500) }}
        anchorReference="anchorPosition"
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'center'
        // }}
      >
        <MenuHeading>
          <span>New Log Entry</span>
        </MenuHeading>
        <form style={{ width: '500px', padding: '8px' }}>
          <Grid container={true} spacing={8} style={{ padding: '16px' }}>
            <ProjectSelect 
              value={this.state.project} 
              handleChange={this.handleChange}
              projects={this.props.projects}
            />
            <DateInput
              value={this.state.date}
              handleChange={this.handleChange}
            />
            <StartTimeInput
              value={this.state.startTime}
              handleChange={this.handleChange}
            />
            <EndTimeInput
              value={this.state.endTime}
              handleChange={this.handleChange}
            />
            <NotesInput
              value={this.state.notes}
              handleChange={this.handleChange}
            />
          </Grid>
        </form>
        <MenuActions>
          <Button onClick={this.toggleMenu}>Cancel</Button>
          <Button color="primary">Save</Button>
        </MenuActions>
      </Popover>
    );
  }
}
