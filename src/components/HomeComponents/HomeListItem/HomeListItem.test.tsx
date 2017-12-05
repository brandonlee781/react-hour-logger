import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HomeListItem } from './HomeListItem';

const itemProps = {
  id: '1',
  startTime: '08:00',
  endTime: '12:00',
  date: '2016-08-13',
  duration: 4,
  project: {
    id: 'test-id',
    name: 'New Project'
  },
  notes: 'New Notes'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeListItem {...itemProps} />, div);
});