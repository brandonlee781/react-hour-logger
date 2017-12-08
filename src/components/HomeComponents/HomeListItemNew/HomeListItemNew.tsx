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
  createNewLog: (newLog: any) => void;
}

interface FormSectionProps {
  value?: string;
  handleChange: any;
  projects?: Project[];
  error: boolean;
}
interface FormDateSectionProps {
  value: moment.Moment | string;
  handleChange: any;
  error: boolean;
}

interface HomeListItemNewState {
  project: string;
  date: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  note: string;
  errors: {
    project: boolean;
    date: boolean;
    startTime: boolean;
    endTime: boolean;
    note: boolean;
  };
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
            error={props.error}
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
            error={props.error}
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
            error={props.error}
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
            error={props.error}
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
            onChange={(event: any) => props.handleChange(event, 'note')}
            error={props.error}
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
      date: null,
      startTime: null,
      endTime: null,
      note: '',
      errors: {
        project: false,
        date: false,
        startTime: false,
        endTime: false,
        note: false
      }
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = () => {
    const errors = {
      project: false,
      date: false,
      startTime: false,
      endTime: false,
      note: false
    };
    this.setState({ errors });
    const validateDate = (date: moment.Moment): boolean => {
      if (!date || !date.isValid()) {
        errors.date = true;
        this.setState({ errors });
        return false;
      }
      return true;
    };
    const validateTimes = (startTime: moment.Moment, endTime: moment.Moment): boolean => {
      if (!startTime || !startTime.isValid()) {
        errors.startTime = true;
        this.setState({ errors });
        return false;
      }
      if (!endTime || !startTime.isValid()) {
        errors.endTime = true;
        this.setState({ errors });
        return false;
      }
      if (!startTime.isBefore(endTime)) {
        errors.startTime = true;
        errors.endTime = true;
        this.setState({ errors });
        return false;
      }
      return true;
    };
    const validateProject = (project: string): boolean => {
      if (!project) {
        errors.project = true;
        this.setState({ errors });
        return false;
      }
      return true;
    };
    const validateNote = (note: string): boolean => {
      if (!note) {
        errors.note = true;
        this.setState({ errors });
        return false;
      }
      return true;
    };

    if (
      validateProject(this.state.project) &&
      validateDate(this.state.date) &&
      validateTimes(this.state.startTime, this.state.endTime) &&
      validateNote(this.state.note)
    ) {
      this.props.createNewLog({
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        projectId: this.state.project,
        note: this.state.note
      });
      this.resetState();
      this.toggleMenu();
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
              error={this.state.errors.project}
            />
            <DateInput
              value={this.state.date}
              handleChange={this.handleChange}
              error={this.state.errors.date}
            />
            <StartTimeInput
              value={this.state.startTime}
              handleChange={this.handleChange}
              error={this.state.errors.startTime}
            />
            <EndTimeInput
              value={this.state.endTime}
              handleChange={this.handleChange}
              error={this.state.errors.endTime}
            />
            <NotesInput
              value={this.state.note}
              handleChange={this.handleChange}
              error={this.state.errors.note}
            />
          </Grid>
        </form>
        <MenuActions>
          <Button onClick={this.toggleMenu}>Cancel</Button>
          <Button color="primary" onClick={this.handleSubmit}>Save</Button>
        </MenuActions>
      </Popover>
    );
  }
}
