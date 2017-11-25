// tslint:disable:no-any
import * as React from 'react';
import { 
  Popover, 
  FormControl,
  Select,
  MenuItem,
  Grid,
  Button
} from 'material-ui';
import {
  FolderOpen,
  Event,
  AccessTime,
  Description,
} from 'material-ui-icons';
import Input, { InputLabel } from 'material-ui/Input'; 
import { MenuHeading, MenuActions, IconGrid } from './HomeListItemNew.style';
import { Project } from '../../../constants/types';

interface HomeListItemNewProps {
  open: boolean;
  projects: Project[];
  toggle: () => void;
}

interface FormSectionProps {
  value: string;
  handleChange: any;
  projects?: Project[];
}

interface HomeListItemNewState {
  project: string;
  date: string ;
  startTime: string;
  endTime: string;
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
            autoWidth={true}
            input={
              <Input 
                id="project-select" 
                value={props.value}
              />
            }
            onChange={(event) => props.handleChange(event, 'project')}
          >
            {props.projects.map((project, ind) => (
              <MenuItem key={ind} value={project.name}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const DateInput = (props: FormSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <Event style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="date-input">Date</InputLabel>
          <Input
            id="date-input"
            type="date"
            fullWidth={true}
            value={props.value}
            onChange={(date: any) => props.handleChange(date, 'date')}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const StartTimeInput = (props: FormSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <AccessTime style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="start-input" required={true}>Start Time</InputLabel>
          <Input
            id="start-input"
            type="time"
            value={props.value}
            onChange={(time: any) => props.handleChange(time, 'startTime')}
            inputProps={{
              step: 15000
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

const EndTimeInput = (props: FormSectionProps) => (
  <Grid item={true} xs={12} sm={6}>
    <Grid container={true} spacing={8}>
      <IconGrid item={true} xs={2}>
        <AccessTime style={{ margin: 'auto auto' }}/>
      </IconGrid>
      <Grid item={true} xs={10}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="end-input" required={true}>End Time</InputLabel>
          <Input
            id="end-input"
            type="time"
            value={props.value}
            onChange={(time: any) => props.handleChange(time, 'endTime')}
            inputProps={{
              step: 15000
            }}
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
      project: '',
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: any, prop: any) => {
    this.setState({ [prop]: event.target.value });
  }

  resetState = () => {
    this.setState(this.baseState);
  }

  toggleMenu = () => {
    this.props.toggle();
    this.resetState.bind(this);
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        // anchorPosition={{ top: 100, right: 100 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuHeading>
          <span>New Log Entry</span>
        </MenuHeading>
        <form style={{ minWidth: '400px', padding: '8px' }}>
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
