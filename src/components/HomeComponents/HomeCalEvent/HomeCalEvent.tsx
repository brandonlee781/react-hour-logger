import * as React from 'react';
import { Log } from '../../../constants/types';
import { EventWrapper } from './HomeCalEvent.style';

interface Props {
  event: Log;
  title: string;
}

export class HomeCalEvent extends React.Component<Props> {
  render() {
    const { event, title } = this.props;
    return (
      <EventWrapper color={event.project.color}>
        <div>
          <div style={{ borderBottom: '1px solid #fff', paddingBottom: '2px' }}>{title}</div>
          <div style={{ marginTop: '4px' }}>{event.note}</div>
        </div>
        <div>{event.duration} hours</div>
      </EventWrapper>
    );
  }
}