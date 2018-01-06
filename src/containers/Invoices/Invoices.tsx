import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Dispatch } from 'redux';
import * as moment from 'moment';

import { 
  ActionType, 
  Invoice, 
  Link, 
  StoreStateType, 
  Log,
  Project,
  Result, 
  GET_ALL_INVOICE, 
  GET_LOGS_BY_DATE, 
  CREATE_NEW_INVOICE,
  // QUERY_LIMIT,
  GET_ALL_PROJECTS,
} from '../../constants';

import { 
  changeInvoiceSelected, 
  setInvoiceTab, 
  setInvoiceFilter, 
  FilterKey, 
  toggleNewInvoiceForm,
  clearNewInvoice,
} from '../../actions';

import { 
  NavDrawer, 
  InvoiceHeader, 
  InvoiceNewForm, 
  SelectedInvoice,
  NewInvoice,
  NoInvoice,
} from '../../components';
import { InvoiceBody, InvoiceContainer } from './Invoices.style';

interface ApolloProps {
  invoices: Result<Invoice[]>;
  links: Result<Link[]>;
  projects: Result<Project[]>;
  selectedInvoice: Invoice;
  newInvoice: Result<Invoice>;
  createNewInvoice: (newInvoice: Partial<Invoice>) => void;
}

interface ReduxProps {
  drawerOpen: boolean;
  selected: string;
  newInvoiceFormShown: boolean;
  tab: string;
  start: string;
  end: string;
  project: string;
}
const mapStateToProps = (state: StoreStateType): ReduxProps => {
  return {
    drawerOpen: state.ui.drawerOpen,
    selected: state.ui.invoice.selected,
    newInvoiceFormShown: state.ui.invoice.newInvoiceFormShown,
    tab: state.ui.invoice.tab,
    start: state.ui.invoice.start,
    end: state.ui.invoice.end,
    project: state.ui.invoice.project
  };
};

interface DispatchProps {
  changeInvoiceSelected: (payload: string) => Dispatch<void>;
  setInvoiceTab: (tab: string) => ActionType<string>;
  setInvoiceFilter: (key: FilterKey, date: string) => ActionType<{}>;
  toggleNewInvoiceForm: () => ActionType<{}>;
  clearNewInvoice: () => Dispatch<void>;
}
export const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    changeInvoiceSelected: (payload: string) => dispatch(changeInvoiceSelected(payload)),
    setInvoiceTab: (tab: string) => dispatch(setInvoiceTab(tab)),
    setInvoiceFilter: (key: FilterKey, date: string) => dispatch(setInvoiceFilter(key, date)),
    toggleNewInvoiceForm: () => dispatch(toggleNewInvoiceForm()),
    clearNewInvoice: () => dispatch(clearNewInvoice())
  };
};

export type Props = ApolloProps & ReduxProps & DispatchProps;

export class InvoicesComponent extends React.Component<Props> {

  downloadCsv = (invoice: Invoice): void => {
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

  downloadPdf = (): void => {
    window.print();
  }

  createInvoice = (): void => {
    this.props.createNewInvoice(this.props.newInvoice.data);
  }

  render() {
    const { links, tab, selectedInvoice, newInvoice, invoices, projects } = this.props;
    return (
      <InvoiceContainer>
        <NavDrawer
          header="Invoices"
          drawerOpen={this.props.drawerOpen}
          links={links.data}
          linksLoading={links.loading}
          changeSelected={this.props.changeInvoiceSelected}
        />
        {!projects.loading && <InvoiceNewForm {...this.props}/>}
        <MediaQuery minWidth={960}>
          {(match) => (
            <InvoiceBody mobile={match}>
              <InvoiceHeader 
                {...this.props}
                downloadCsv={this.downloadCsv}
                toggleNewInvoiceForm={this.props.toggleNewInvoiceForm}
                newInvoice={newInvoice}
                create={this.createInvoice}
              />
              {selectedInvoice && <SelectedInvoice
                tab={tab}
                selectedInvoice={selectedInvoice}
                setInvoiceTab={this.props.setInvoiceTab}
              />}
              {newInvoice && !selectedInvoice && <NewInvoice
                tab={tab}
                newInvoice={newInvoice}
                setInvoiceTab={this.props.setInvoiceTab}
              />}
              {!selectedInvoice && !newInvoice &&
                <NoInvoice invoices={invoices}/>
              }
            </InvoiceBody>
          )}
        </MediaQuery>
      </InvoiceContainer>
    );
  }
}

interface Response {
  allInvoices?: {
    invoices: Invoice[]
  };
  allLogsByDates?: {
    logs: Log[]
  };
  allProjects?: {
    projects: Project[];
  };
}
export const invoiceRedux = connect(mapStateToProps, mapDispatchToProps);

const getInvoices = graphql<Response, Props>(GET_ALL_INVOICE, {
  props: ({ ownProps, data: { loading, error, allInvoices } }) => {
    if (!loading) {
      return {
        invoices: {
          error,
          loading,
          data: allInvoices.invoices
        },
        selectedInvoice: allInvoices.invoices.filter(i => i.id === ownProps.selected)[0],
        links: {
          error,
          loading,
          data: [
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
        links: {
          loading
        }
      };
    }
  }
});
const getProjects = graphql<Response, Props>(GET_ALL_PROJECTS, {
  props: ({ ownProps, data: { loading, error, allProjects } }) => {
    if (!loading) {
      return {
        projects: {
          error,
          loading,
          data: allProjects.projects
        }
      };
    } else {
      return {
        projects: {
          loading
        }
      };
    }
  }
});
const getLogsByDate = graphql<Response, Props>(GET_LOGS_BY_DATE, {
  options: ({ start, end, project }) => {
    return {
      variables: {
        start,
        end,
        project,
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
          data: {
            date: ownProps.end,
            rate: 25,
            hours: allLogsByDates.logs.map(l => l.duration).reduce((a, b) => a + b, 0),
            logs: allLogsByDates.logs
          }
        }
      };
    } else {
      return {
        newInvoice: {
          loading,
          data: null,
        }
      };
    }
  }
});
const createInvoiceMutation = graphql<Response, Props>(CREATE_NEW_INVOICE, {
  props: ({ ownProps, mutate}) => ({
    createNewInvoice: (newLog: Partial<Invoice>) => mutate({
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
  getProjects
)(InvoicesComponent);
