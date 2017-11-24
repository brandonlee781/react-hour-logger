import * as React from 'react';
import { createMount } from 'material-ui/test-utils';
import { ReactWrapper } from 'enzyme';
import { store } from '../../../store';
import { Mount } from '../../../constants/types';
import { NavDrawer, NavDrawerItem } from '../../index';
import { BaseDrawer, DrawerHeader } from './NavDrawer.style';
import { List, Drawer } from 'material-ui';
import { changeHomeSelected } from '../../../actions/ui';
// import MediaQuery from 'react-responsive';

declare var window: Window;

const props = {
  header: 'This is a new Header',
  links: [{'id': 'nothing', 'title': 'Nothing', 'selected': false, 'icon': 'folder_open'}],
  linksLoading: false,
  drawerOpen: true,
  changeSelected: (payload: string) => store.dispatch(changeHomeSelected(payload))
};

describe('<NavDrawer/>', () => {
  let mount: Mount;
  let drawer: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    drawer = mount(<NavDrawer {...props}/>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(drawer.exists()).toBe(true);    
  });

  // describe('the passed props', () => {

  // });

  describe('the rendered div', () => {
    it('always renders a div', () => {
      expect(drawer.children().find('div').length).toBeGreaterThan(0);
    });
    
    it('contains everything else that gets rendered', () => {
      const divs = drawer.find('div');
      const wrapperDiv = divs.first();
      expect(wrapperDiv.html()).toEqual(drawer.children().html());
    });
  });

  describe('the rendered <BaseDrawer/>', () => {
    let base: ReactWrapper;

    beforeAll(() => {
      base = drawer.find(BaseDrawer);
    });

    it('should only render once', () => {
      expect(drawer.find(BaseDrawer).length).toBe(1);
    });
    
    it('always render a Drawer', () => {
      expect(base.children().find(Drawer).length).toBeGreaterThan(0);
    });

    it('contains everything else that get rendered', () => {
      const muiDrawer = base.find(Drawer);
      const wrapperDrawer = muiDrawer.first();
      expect(wrapperDrawer.html()).toEqual(base.children().html());
    });

    it('has the same correct props as the parent', () => {
      expect(base.prop('open')).toEqual(drawer.prop('drawerOpen'));
    });

    it('sets the correct type based on the window width', () => {
      if (window.innerWidth >= 960) {
        expect(base.prop('type')).toBe('persistant');
      } else {
        expect(base.prop('type')).toBe('permanent');
      }
    });
  });

  describe('the rendered <DrawerHeader/>', () => {
    let header: ReactWrapper;

    beforeAll(() => {
      header = drawer.find(DrawerHeader);
    });

    it('should only render once', () => {
      expect(header.length).toBe(1);
    });

    it('always renders a span', () => {
      expect(header.find('span').length).toBeGreaterThan(0);
    });

    it('should have no children', () => {
      let wrapperSpan = header.find('span').first();
      expect(wrapperSpan.children()).toHaveLength(0);
    });

    it('should contain text equal to the root prop', () => {
      expect(header.text()).toEqual(drawer.prop('header'));
    });
  });

  describe('the rendered <List/>', () => {
    let list: ReactWrapper;
    beforeAll(() => {
      list = drawer.find(List);
    });

    it('should only render once', () => {
      expect(list).toHaveLength(1);
    });
  });

  describe('the rendered <NavDrawerItem/>s', () => {
    it('should only render once initially', () => {
      expect(drawer.find(NavDrawerItem)).toHaveLength(1);
    });
  
    it('should render twice after parent props change', () => {
      let newProps = JSON.parse(JSON.stringify(props));
      newProps.links.push({id: 'new', title: 'New', selected: false, icon: 'folder_open'});
      expect(
        drawer.setProps(newProps)
          .find(NavDrawerItem)
          .length
      ).toEqual(2);
    });
  
    it('should get class "selected" when parent prop key "selected" changes to true', () => {
      let newProps = JSON.parse(JSON.stringify(props)); 
      newProps.links[0].selected = true;
      expect(
        drawer.setProps(newProps)
          .find(NavDrawerItem)
          .find('li')
          .hasClass('selected')
      ).toBe(true);
    });

    it('should have a key equal to its id', () => {
      const item = drawer.find(NavDrawerItem);
      expect(item.key()).toEqual(item.prop('id'));
    });

    it('should have props equal to the parent link', () => {
      const item = drawer.find(NavDrawerItem);
      // tslint:disable-next-line:no-any
      const parentProps: any = drawer.props();
      const link = parentProps.links[0];
      expect(item.prop('id')).toEqual(link.id);
      expect(item.prop('title')).toEqual(link.title);
      expect(item.prop('icon')).toEqual(link.icon);
      expect(item.prop('selected')).toEqual(link.selected);
      expect(item.prop('changeSelected')).toEqual(drawer.prop('changeSelected'));
    });
  });
});