import * as React from 'react';
import { Mount } from '../../../constants/types';
import { ReactWrapper } from 'enzyme';
import { createMount } from 'material-ui/test-utils';
import { HomeListItemNew } from './HomeListItemNew';

describe('<HomeListItemNew/>', () => {
  let mount: Mount;
  let itemNew: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    itemNew = mount(<HomeListItemNew/>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(itemNew.exists()).toBe(true);
  });
});