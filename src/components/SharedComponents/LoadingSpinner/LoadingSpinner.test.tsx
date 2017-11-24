import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { ReactWrapper } from 'enzyme';
import { createMount } from 'material-ui/test-utils';
import { LoadingSpinner } from './LoadingSpinner';
import 'jest-styled-components';
import { Mount } from '../../../constants/types';

describe('<LoadingSpinner/>', () => {
  let mount: Mount;
  let spinner: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    spinner = mount(<LoadingSpinner show={true} size={40}/>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(spinner.exists()).toBe(true);
    expect(spinner).toHaveStyleRule('display', 'flex');
  });

  describe('the passed props', () => {
    it('renders with display none if show is false', () => {
      spinner.setProps({show: false});
      expect(spinner).toHaveStyleRule('display', 'none');
    });
  
    it('changes its style rule when the passed prop changes', () => {
      expect(spinner.setProps({ show: true })).toHaveStyleRule('display', 'flex');
      expect(spinner.setProps({ show: false })).toHaveStyleRule('display', 'none');
    });
  });

  describe('the rendered div', () => {
    it ('should only render a single div', () => {
      expect(spinner.find('div').length).toBe(1);
    });

    it('contains everything else that gets rendered', () => {
      const divs = spinner.find('div');
      const wrappedDiv = divs.first();
      expect(wrappedDiv.html()).toEqual(spinner.children().html());
    });
  });

  describe('the rendered img', () => {
    let img: ReactWrapper;

    beforeAll(() => {
      img = spinner.find('img');
    });

    it('should only render a single img', () => {
      expect(img.length).toBe(1);
    });

    it('has a src prop', () => {
      expect(img.prop('src')).toBeTruthy();
    });

    it('sets the props to equal the parent props', () => {
      expect(spinner.prop('size')).toEqual(img.prop('size'));
    });

    it('css height and width should match the size prop', () => {
      expect(img).toHaveStyleRule('height', '40px');
      expect(img).toHaveStyleRule('width', '40px');
    });
  });
});
