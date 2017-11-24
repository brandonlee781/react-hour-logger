import * as React from 'react';
import { spy } from 'sinon';
import { NavDrawerItem } from './NavDrawerItem';
import { Icon } from 'material-ui';
import { ItemWrapper, ItemText, ItemIcon } from './NavDrawerItem.style';
import { changeHomeSelected } from '../../../actions/ui';
import { Mount, Shallow } from '../../../constants/types';
import { createMount, createShallow } from 'material-ui/test-utils';
import { ReactWrapper } from 'enzyme'; 

const props = {
  changeSelected: changeHomeSelected,
  id: 'something',
  title: 'Something',
  icon: 'folder_open',
  selected: true
};

describe('<NavDrawerItem/>', () => {
  let mount: Mount;
  let shallow: Shallow;
  let item: ReactWrapper;

  beforeAll(() => {
    mount = createMount();
    shallow = createShallow();
    item = mount(<NavDrawerItem {...props}/>);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    expect(item.exists()).toBe(true);
  });
  
  describe('the rendered <ItemWrapper/>', () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
      wrapper = item.find(ItemWrapper);
    });

    it('should only render once', () => {
      expect(wrapper.length).toBe(1);
    });

    it('always renders a li', () => {
      expect(wrapper.find('li').length).toBeGreaterThan(0);
    });

    it('contains everything else that gets rendered', () => {
      const li = item.find('li');
      const liWrapper = li.first();
      expect(liWrapper.html()).toEqual(item.children().html());
    }); 

    it('should have the class "selected" if the root selected prop is true', () => {
      if (item.prop('selected') === true) {
        expect(wrapper.hasClass('selected')).toBe(true);
      } else {
        expect(wrapper.hasClass('selected')).toBe(false);
      }
    });

    it('should call changeSelected on click', () => {
      const mockOnClick = spy();
      const wrap = shallow(<NavDrawerItem {...props} changeSelected={mockOnClick}/>);
      wrap.simulate('click');
      expect(mockOnClick.calledOnce).toBe(true);
    });
  });

  describe('the rendered <ItemIcon/>', () => {
    let itemIcon: ReactWrapper;

    beforeAll(() => {
      itemIcon = item.find(ItemIcon);
    });

    it('always renders a span', () => {
      expect(itemIcon.find('span').length).toBeGreaterThan(0);
    });

    it('contains everything else that gets rendered', () => {
      const span = itemIcon.find('span');
      const spanWrapper = span.first();
      expect(spanWrapper.html()).toEqual(itemIcon.children().first().html());
    });

    it('contains an Icon element', () => {
      expect(itemIcon.find(Icon).length).toBe(1);
    });

    it('has the correct icon text passed to it', () => {
      const icon = itemIcon.find(Icon);
      expect(icon.text()).toBe(item.prop('icon'));
    });
  });

  describe('the rendered <ItemText/>', () => {
    let itemText: ReactWrapper;

    beforeAll(() => {
      itemText = item.find(ItemText);
    });

    it('always renders a span', () => {
      expect(itemText.find('span').length).toBe(1);
    });

    it('contains everyting else that gets rendered', () => {
      const span = itemText.find('span');
      const wrapperSpan = span.first();
      expect(wrapperSpan.html()).toEqual(itemText.children().html());
    });

    it('has the correct text passed from the root element title prop', () => {
      expect(itemText.text()).toEqual(item.prop('title'));
    });
  });

});
