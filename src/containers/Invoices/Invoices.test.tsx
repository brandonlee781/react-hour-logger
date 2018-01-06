import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { InvoicesComponent, Props } from './Invoices';

import Tabs from 'material-ui/Tabs';
import { InvoiceHeader, InvoiceTable, InvoiceDocument, NavDrawer, InvoiceNewForm } from '../../components';

const setup = (override?: {}) => {
  const props: Props = Object.assign(
    {},
    {
      invoices: {
        data: [{
          id: 'fakeinvoice',
          number: 1,
          hours: 10,
          rate: 25,
          date: '2016-8-13',
          logs: [{
            id: 'fakelog',
            startTime: '8:00',
            endTime: '12:00',
            date: '2016-08-13',
            duration: 4,
            project: {
              id: 'fakeproject',
              name: 'fakeproject.com',
              color: '#2196F3'
            },
            note: 'this is a fake note',
          }],
        }],
        error: null,
        loading: false,
      },
      links: {
        data: [{
          title: 'FakeLink',
          id: 'fakelink',
          icon: 'folder_open',
          selected: true
        }],
        error: null,
        loading: false,
      },
      projects: {
        data: [],
        error: null,
        loading: false
      },
      selectedInvoice: {
        id: 'fakeinvoice',
        number: 1,
        hours: 10,
        rate: 25,
        date: '2016-8-13',
        logs: [{
          id: 'fakelog',
          startTime: '8:00',
          endTime: '12:00',
          date: '2016-08-13',
          duration: 4,
          project: {
            id: 'fakeproject',
            name: 'fakeproject.com',
            color: '#2196F3'
          },
          note: 'this is a fake note',
        }],
      },
      newInvoice: null,
      drawerOpen: true,
      selected: 'fakelink',
      newInvoiceFormShown: false,
      tab: 'hours',
      start: '',
      end: '',
      project: '',
      changeInvoiceSelected: () => null,
      setInvoiceTab: () => null,
      setInvoiceFilter: () => null,
      toggleNewInvoiceForm: () => null,
      clearNewInvoice: () => null,
      createNewInvoice: () => null,
    }, 
    override
  );
  const wrapper = shallow(<InvoicesComponent {...props}/>);
  const mounted = mount(<InvoicesComponent {...props}/>);

  return {
    props,
    wrapper,
    mounted,
    header: mounted.find(InvoiceHeader),
    table: mounted.find(InvoiceTable),
    doc: mounted.find(InvoiceDocument),
    drawer: mounted.find(NavDrawer),
    newForm: mounted.find(InvoiceNewForm)
  };
};

describe('Invoice Container', () => {
  test('renders', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  test('snapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('children rendering', () => {
    test('tabs should show if selectedInvoice', () => {
      const { mounted } = setup();
      expect(mounted.find(Tabs).length).toEqual(1);
    });
    test('tabs should not show if no selectedInvoice', () => {
      const { mounted } = setup({ selectedInvoice: null });
      expect(mounted.find(Tabs).length).toEqual(0);
    });

    test('a InvoiceHeader should be rendered', () => {
      const { header } = setup();
      expect(header.length).toEqual(1);
    });
  
    test('InvoiceTable should be visible if tab is hours', () => {
      const { table, doc } = setup();
      expect(table.length).toEqual(1);
      expect(doc.length).toEqual(0);
    });
  
    test('InvoiceDocument should be visible if tab is invoice', () => {
      const { table, doc } = setup({ tab: 'invoice' });
      expect(doc.length).toEqual(1);
      expect(table.length).toEqual(0);
    });
  });

  describe('children props', () => {
    test('NavDrawer has the correct props', () => {
      const { drawer, mounted } = setup();
      expect(drawer.props().drawerOpen).toEqual(mounted.props().drawerOpen);
      expect(drawer.props().links).toEqual(mounted.props().links.data);
      expect(drawer.props().linksLoading).toEqual(mounted.props().links.loading);
    });

    test('InvoiceNewForm has the correct props', () => {
      const { newForm, mounted } = setup({ start: '2017-12-01', end: '2017-12-02' });
      expect(newForm.props().newInvoiceFormShown).toEqual(mounted.props().newInvoiceFormShown);
      expect(newForm.props().start).toEqual(mounted.props().start);
      expect(newForm.props().end).toEqual(mounted.props().end);
    });

    test('InvoiceHeader has the correct props', () => {
      const { header, mounted } = setup();
      expect(header.props().invoices).toEqual(mounted.props().invoices);
      expect(header.props().links).toEqual(mounted.props().links);
      expect(header.props().selectedInvoice).toEqual(mounted.props().selectedInvoice);
      expect(header.props().tab).toEqual(mounted.props().tab);
    });

    test('InvoiceTable has the correct props', () => {
      const { table, mounted } = setup();
      expect(table.props().invoice).toEqual(mounted.props().selectedInvoice);
    });

    test('InvoiceDocument has the correct props', () => {
      const { doc, mounted } = setup({ tab: 'invoice' });
      expect(doc.props().invoice).toEqual(mounted.props().selectedInvoice); 
    });
  });

});