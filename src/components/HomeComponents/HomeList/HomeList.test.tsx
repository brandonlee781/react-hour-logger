import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HomeList } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeList logs={[]} />, div);
});