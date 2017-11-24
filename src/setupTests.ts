import { Mount } from './constants/types';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { jsdom } from 'jsdom';
import 'raf/polyfill';

configure({ adapter: new Adapter() });

global.requestAnimationFrame = function(callback: {}) {
  setTimeout(callback, 0);
  return 0;
};