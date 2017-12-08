import { Tabs } from 'material-ui';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Dispatch } from 'redux';
import * as moment from 'moment';

import { GET_ALL_INVOICE, GET_LOGS_BY_DATE, CREATE_NEW_INVOICE } from '../../constants/queries';
import { 
  changeInvoiceSelected, 
  setInvoiceTab, 
  setInvoiceFilter, 
  FilterKey, 
  toggleNewInvoiceForm,
  clearNewInvoice,
} from '../../actions';
import { InvoiceDocument, InvoiceTable, NavDrawer, InvoiceHeader, InvoiceNewForm } from '../../components';
import { ActionType, Invoice, Link, StoreStateType, Log, Result } from '../../constants/types';
import { InvoiceBody, InvoiceContainer, InvoiceTab } from './Invoices.style';

interface ApolloProps {
  invoices?: Result<Invoice>;
  links?: Result<Link>;
  selectedInvoice?: Invoice;
  newInvoice?: {
    error: Error;
    loading: boolean;
    invoice: Invoice;
  };
  createNewInvoice?: (newInvoice: NewInvoiceData) => void;
}

interface ReduxProps {
  drawerOpen?: boolean;
  selected?: string;
  newInvoiceFormShown?: boolean;
  tab?: string;
  start?: string;
  end?: string;
}
const mapStateToProps = (state: StoreStateType): ReduxProps => {
  return {
    drawerOpen: state.ui.drawerOpen,
    selected: state.ui.invoice.selected,
    newInvoiceFormShown: state.ui.invoice.newInvoiceFormShown,
    tab: state.ui.invoice.tab,
    start: state.ui.invoice.start,
    end: state.ui.invoice.end,
  };
};

interface DispatchProps {
  changeInvoiceSelected?: (payload: string) => Dispatch<void>;
  setInvoiceTab?: (tab: string) => ActionType<string>;
  setInvoiceFilter?: (key: FilterKey, date: string) => ActionType<{}>;
  toggleNewInvoiceForm?: () => ActionType<{}>;
  clearNewInvoice?: () => Dispatch<void>;
}
const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    changeInvoiceSelected: (payload: string) => dispatch(changeInvoiceSelected(payload)),
    setInvoiceTab: (tab: string) => dispatch(setInvoiceTab(tab)),
    setInvoiceFilter: (key: FilterKey, date: string) => dispatch(setInvoiceFilter(key, date)),
    toggleNewInvoiceForm: () => dispatch(toggleNewInvoiceForm()),
    clearNewInvoice: () => dispatch(clearNewInvoice())
  };
};

type Props = ApolloProps & ReduxProps & DispatchProps;

export class InvoicesComponent extends React.Component<Props> {

  downloadCsv = (invoice: Invoice) => {
    let formattedDate = moment(invoice.date, 'YYYY-MM-DD').format('MMMDD');
    let csv = 'Date,StartTime,EndTime,Duration,Project,Note\n';
    invoice.logs.forEach(row => {
      csv += `${row.date}, ${row.startTime}, ${row.endTime}, ${row.duration}, ${row.project.name}, ${row.note}`;
      csv += '\n';
    });
    const hiddenEl = document.createElement('a');
    hiddenEl.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenEl.target = '_blank';
    hiddenEl.download = formattedDate + '_hours.csv';
    hiddenEl.click();
  }

  downloadPdf = () => {
    window.print();
  }

  createInvoice = () => {
    this.props.createNewInvoice(this.props.newInvoice.invoice);
  }

  render() {
    const { links, tab, selectedInvoice, newInvoice, start, end } = this.props;
    return (
      <InvoiceContainer>
        <NavDrawer
          header="Invoices"
          drawerOpen={this.props.drawerOpen}
          links={links.items}
          linksLoading={links.loading}
          changeSelected={this.props.changeInvoiceSelected}
        />
        <InvoiceNewForm 
          open={this.props.newInvoiceFormShown}
          toggleMenu={this.props.toggleNewInvoiceForm}
          clear={this.props.clearNewInvoice}
          setInvoiceFilter={this.props.setInvoiceFilter}
          start={start}
          end={end}
        />
        <MediaQuery minWidth={960}>
          {(match) => (
            <InvoiceBody mobile={match}>
              <InvoiceHeader 
                {...this.props}
                downloadCsv={this.downloadCsv}
                toggleNewInvoiceForm={this.props.toggleNewInvoiceForm}
                newInvoice={!!newInvoice}
                create={this.createInvoice}
              />
              { (selectedInvoice || newInvoice) && 
                <Tabs 
                  value={tab} 
                  onChange={(e, val) => this.props.setInvoiceTab(val)}
                  indicatorColor="primary"
                  fullWidth={true}
                  centered={true}
                  className="no-print"
                >
                  <InvoiceTab value="hours" label="Hours"/>
                  <InvoiceTab value="invoice" label="Invoice"/>
                </Tabs>
              }
              {tab === 'hours' && selectedInvoice &&  <InvoiceTable invoice={selectedInvoice}/>}
              {tab === 'invoice' && selectedInvoice && <InvoiceDocument invoice={selectedInvoice}/>}

              { tab === 'hours' &&
                newInvoice && !newInvoice.loading &&
                <InvoiceTable invoice={newInvoice.invoice}/>
              }
              { tab === 'invoice' &&
                newInvoice && !newInvoice.loading &&
                <InvoiceDocument invoice={newInvoice.invoice}/>
              }
            </InvoiceBody>
          )}
        </MediaQuery>
      </InvoiceContainer>
    );
  }
}

interface Response {
  allInvoices: {
    invoices: Invoice[]
  };
  allLogsByDates?: {
    logs: Log[]
  };
}
const invoiceRedux = connect(mapStateToProps, mapDispatchToProps);
const getInvoices = graphql<Response, Props>(GET_ALL_INVOICE, {
  props: ({ ownProps, data: { loading, error, allInvoices } }) => {
    if (!loading) {
      return {
        invoices: {
          error,
          loading,
          items: allInvoices.invoices
        },
        selectedInvoice: allInvoices.invoices.filter(i => i.id === ownProps.selected)[0],
        links: {
          error,
          loading,
          items: [
            {
              id: '',
              title: 'Create New Invoice',
              icon: '',
              selected: ownProps.selected === ''
            },
            ...allInvoices.invoices.map((inv) => {
              return {
                id: inv.id,
                title: `Invoice #${inv.number} - ${moment(inv.date, 'YYYY-MM-DD').format('MM/DD/YYYY')}`,
                icon: 'receipt',
                selected: inv.id === ownProps.selected ? true : false
              };
            })
          ]
        }
      };
    } else {
      return {
        invoices: {
          loading
        },
        selectedInvoice: null,
        links: {
          loading
        }
      };
    }
  }
});
const getLogsByDate = graphql<Response, Props>(GET_LOGS_BY_DATE, {
  options: ({ start, end }) => {
    return {
      variables: {
        start,
        end,
        limit: 100,
        offset: 0
      }
    };
  },
  skip: (ownProps) => ownProps.start === '' || ownProps.end === '',
  props: ({ ownProps, data: { loading, error, allLogsByDates } }) => {
    if (!loading) {
      return {
        newInvoice: {
          error,
          loading,
          invoice: {
            id: null,
            date: ownProps.end,
            rate: 25,
            hours: allLogsByDates.logs.map(l => l.duration).reduce((a, b) => a + b),
            logs: allLogsByDates.logs
          }
        }
      };
    } else {
      return {
        newInvoice: {
          error,
          loading,
          invoice: null
        }
      };
    }
  }
});
interface NewInvoiceData {
  date: string;
  rate: number;
  hours: number;
  logs: Log[];
}
const createInvoiceMutation = graphql<Response, Props>(CREATE_NEW_INVOICE, {
  props: ({ ownProps, mutate}) => ({
    createNewInvoice: (newLog: NewInvoiceData) => mutate({
      variables: {
        date: newLog.date,
        rate: newLog.rate,
        hours: newLog.hours,
        logs: newLog.logs.map(l => l.id)
      },
      update: (proxy, { data: { createInvoice } }) => {
        // Get all invoices from cache
        const data: Response = proxy.readQuery({ query: GET_ALL_INVOICE, variables: {
          projectId: ownProps.selected, limit: 100, offset: 0 
        }});
        // Add the new invoice to the beginning
        data.allInvoices.invoices.unshift(createInvoice.invoice);
        // Replace the current query with the new data
        proxy.writeQuery({
          query: GET_ALL_INVOICE,
          data
        });
        // clear the new invoice form
        ownProps.clearNewInvoice();
        // Switch to the new invoice
        ownProps.changeInvoiceSelected(createInvoice.invoice.id);
      }
    })
  })
});

export const Invoices = compose(
  invoiceRedux,
  createInvoiceMutation,
  getLogsByDate,
  getInvoices,
)(InvoicesComponent);
