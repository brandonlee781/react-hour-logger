import styled from 'styled-components';

const lightBorder = '1px solid rgba(0,0,0,0.1)';
const flexRowBet = `
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const ViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const InvoiceHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 300px;
  margin-right: 40px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  .address {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
  }
  .name {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 50px;
  width: 275px;
  h3 {
    text-align: right;
    font-weight: bold;
  }
  .date, .number, .customer {
    border: ${lightBorder};
  }
  .date {
    width: 100%;
    background: #999;
    color: #fff;
    font-weight: bold;
    text-align: left;
    padding: 2px 8px;
  }
  .customer, .number {
    ${flexRowBet}
    padding: 6px 8px;
    font-weight: bold;
    border: $light-border;
  }
  .customer {
    flex-flow: column nowrap;
  }
  .customer div {
    ${flexRowBet}
  }
  .customer span {
    text-align: left;
  }
`;

export const ViewBody = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 80%;
  margin: 0 auto;
  h4 {
    text-align: left;
    margin-left: 30px;
  }
`;

export const ViewTable = styled.table`
  width: 100%;
  margin: 30px 24px;
  thead {
    background-color: #999;
    color: #fff;
    font-weight: bold;
    tr th {
      padding: 0 8px;
      border-right: 1px solid #fff;
    }
  }
  tbody {
    tr, tr td {
      border: ${lightBorder};
    }
    tr td {
      padding: 6px 8px;
    }
  }
  .project-name, .project-hours, .unit-price, .amount {
    text-align: right;
  }
`;
export const Totals = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-self: flex-end;
  width: 30%;
  .subtotal,
  .tax,
  .total {
    ${flexRowBet}
    font-weight: bold;
  }
  .subtotal {
    padding: 16px 4px;
    border-bottom: ${lightBorder};
  }
  .tax {
    padding: 6px 4px;
    border-bottom: ${lightBorder}};
  }
  .total {
    padding: 6px 4px;
  }
`;