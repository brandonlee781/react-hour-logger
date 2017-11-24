import * as React from 'react';
import Popover from 'material-ui/Popover';

interface HomeListItemNewProps {
  
}

export const HomeListItemNew = (props: HomeListItemNewProps) => (
  <Popover
    open={true}
    // anchorPosition={{ top: 100, right: 100 }}
    anchorOrigin={{
      vertical: 100,
      horizontal: 'right'
    }}
  >
    <h1>Hello</h1>
  </Popover>
);