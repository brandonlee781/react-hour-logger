import * as React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

import { storiesOf } from '@storybook/react';

storiesOf('Loading Spinner', module)
  .add('Shown', () => <LoadingSpinner show={true}/>)
  .add('Custom Size', () => <LoadingSpinner show={true} size={60}/>);