import * as React from 'react';
import { Log } from '../../../constants/types';
import { EventWrapper, ColorCircle } from './HomeCalMonthEvent.style';

interface Props {
  event: Log;
  title: string;
}

// tslint:disable-next-line:no-any
export class HomeCalMonthEvent extends React.Component<Props, {}> {
  render() {
    const { event } = this.props;
    return (
      <EventWrapper>
        <ColorCircle color={event.project.color}/>
        <span>{event.duration}hrs: <strong>{event.project.name}</strong></span>
      </EventWrapper>
    );
  }
}