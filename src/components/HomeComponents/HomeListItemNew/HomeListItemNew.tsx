import * as React from 'react';
import { 
  Popover, 
  // TextField, 
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from 'material-ui';
import { MenuHeading } from './HomeListItemNew.style';
import { Project } from '../../../constants/types';

interface HomeListItemNewProps {
  open: boolean;
  projects: Project[];
}

interface HomeListItemNewState {
  project: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

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
    this.changeName = this.changeName.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
  }
  // tslint:disable:no-any
  changeName(event: any) {
    this.setState({ project: event.target.value });
  }
  changeDate(event: any) {
    this.setState({ date: event.target.value });
  }
  changeStartTime(event: any) {
    this.setState({ startTime: event.target.value });
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        // anchorPosition={{ top: 100, right: 100 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 400
        }}
      >
        <MenuHeading>
          <span>Create a new log entry</span>
        </MenuHeading>
        <form style={{ minWidth: '400px', padding: '8px' }}>
          <Grid container={true} spacing={8}>
            <Grid item={true} xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="project-select">Project</InputLabel>
                <Select
                  value={this.state.project}
                  autoWidth={true}
                  input={<Input id="project-select" value={this.state.project}/>}
                  onChange={this.changeName}
                >
                  {this.props.projects.map((project, ind) => (
                    <MenuItem key={ind} value={project.name}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="date-input">Date</InputLabel>
                <Input
                  id="date-input"
                  fullWidth={true}
                  value={this.state.date}
                  onChange={this.changeDate}
                />
              </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="start-input">Start Time</InputLabel>
                <Input
                  id="start-input"
                  fullWidth={true}
                  value={this.state.startTime}
                  onChange={this.changeStartTime}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Popover>
    );
  }
}
