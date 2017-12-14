// tslint:disable-next-line:no-any
(global as any).requestAnimationFrame = function(callback: any) {
  setTimeout(callback, 0);
};

import { Mount } from './constants/types';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { jsdom } from 'jsdom';
// import 'raf/polyfill';

configure({ adapter: new Adapter() });