import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
const theme = createMuiTheme();

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { NavDrawerItem } from './NavDrawerItem';

type storyDec = () => React.ComponentClass<{}> | React.StatelessComponent<{}> | JSX.Element;

const muiDecorator = (story: storyDec) => (
  <MuiThemeProvider theme={theme}>
    {story()}
  </MuiThemeProvider>
);

const mockDrawer = (story: storyDec) => (
  <div style={{ backgroundColor: '#2196f3', width: '378px' }}>
    {story()}
  </div> 
);

storiesOf('NavDrawerItem', module)
  .addDecorator(muiDecorator)
  .addDecorator(mockDrawer)
  .add('Default', () => (
    <NavDrawerItem 
      icon="folder_open" 
      id="quantogy" 
      title="Quantogy" 
      selected={false} 
      changeSelected={action('clicked')}
    />
  ))
  .add('Selected', () => (
    <NavDrawerItem 
      icon="folder_open" 
      id="quantogy" 
      title="Quantogy" 
      selected={true} 
      changeSelected={action('clicked')}
    />
  ))
  .add('Two Items', () => (
    <div>
      <NavDrawerItem 
        icon="folder_open" 
        id="quantogy" 
        title="Quantogy" 
        selected={true} 
        changeSelected={action('clicked')}
      />
      <NavDrawerItem 
        icon="folder_open" 
        id="dacis" 
        title="DACIS" 
        selected={false} 
        changeSelected={action('clicked')}
      />
    </div>
  ));