import * as React from 'react';
import { Log } from '../../../constants/types';
import {
  FolderOpen,
  Event,
  AccessTime,
  Timelapse,
  ModeEdit,
  Delete
} from 'material-ui-icons';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import {
  LogEntry,
  LogWrapper,
  LogNote,
  LogDetail,
  LogButton
} from './HomeListItem.style';
import * as moment from 'moment';

type HomeListItemProps = Log;

export const HomeListItem = (props: HomeListItemProps) => (
  <LogEntry>
    <LogWrapper>
      <LogNote>{props.note}</LogNote>
      <LogDetail>
        <div>
          <FolderOpen/>
          <span>{props.project.name}</span>
        </div>
        <div>
          <Event/>
          <span>{moment(props.date, 'YYYY-MM-DD').format('ddd MMM DD')}</span>
        </div>
        <div>
          <AccessTime/>
          <span>{moment(props.startTime, 'HH:mm:ss').format('hh:mm a')}</span>
        </div>
        <div>
          <AccessTime/>
          <span>{moment(props.endTime, 'HH:mm:ss').format('hh:mm a')}</span>
        </div>
        <div>
          <Timelapse/>
          <span>{props.duration}</span>
        </div>
      </LogDetail>
    </LogWrapper>
    <div>
      <LogButton>
        <ModeEdit style={{fill: blue[400]}}/>
      </LogButton>
      <LogButton>
        <Delete style={{fill: red[400]}}/>
      </LogButton>
    </div>
  </LogEntry>
);