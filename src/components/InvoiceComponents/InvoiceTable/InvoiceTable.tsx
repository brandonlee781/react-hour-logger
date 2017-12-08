import * as React from 'react';
import { InvoiceTableWrapper } from './InvoiceTable.style';
import { Invoice, Log } from '../../../constants/types';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import * as moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

interface Props {
  invoice: Invoice;
}

export const InvoiceTable = (props: Props) => (
  <InvoiceTableWrapper>
    <ReactTable
      data={props.invoice.logs}
      columns={[
        {
          Header: 'Date',
          id: 'date',
          accessor: (d: Log) => moment(d.date, 'YYYY-MM-DD').format('ddd MMM Do, YYYY'),
          sortMethod: (a, b) => {
            if (a === b) {
              return 0;
            } else if (moment(a, 'ddd MMM Do, YYYY').isBefore(moment(b, 'ddd MMM Do, YYYY'))) {
              return 1;
            } else {
              return -1;
            }

          }
        },
        {
          Header: 'Start Time',
          id: 'startTime',
          accessor: (d: Log) => moment(d.startTime, 'HH:mm:ss').format('hh:mm a'),
          maxWidth: 100,
          sortMethod: (a, b) => {
            if (a === b) {
              return 0;
            } else if (moment(a, 'hh:mm a').isBefore(moment(b, 'hh:mm a'))) {
              return 1;
            } else {
              return -1;
            }

          }
        },
        {
          Header: 'End Time',
          id: 'endTime',
          accessor: (d: Log) => moment(d.endTime, 'HH:mm:ss').format('hh:mm a'),
          maxWidth: 100
        },
        {
          Header: 'Duration',
          accessor: 'duration',
          maxWidth: 75
        },
        {
          Header: 'Project',
          accessor: 'project.name'
        },
        {
          Header: 'Note',
          accessor: 'note'
        }
      ]}
      defaultSorted={[
        {
          id: 'date',
          desc: true
        },
        {
          id: 'startTime',
          desc: true
        }
      ]}
      className="-striped -highlight"
      defaultPageSize={30}
      style={{width: '100%', height: 'calc(100vh - 190px)'}}
      showPaginationBottom={false}
      multiSort={true}
    />
  </InvoiceTableWrapper>
);