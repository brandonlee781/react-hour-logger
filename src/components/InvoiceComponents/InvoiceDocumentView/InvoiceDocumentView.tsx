import * as React from 'react';
import { Invoice, Log } from '../../../constants/types';
import { 
  ViewWrapper, 
  AddressWrapper, 
  InfoWrapper, 
  InvoiceHeader, 
  ViewBody, 
  ViewTable, 
  Totals 
} from './InvoiceDocumentView.style';

interface Props extends Invoice {}
interface ProjectHours {
  project: string;
  hours: number;
}

const hoursPerProject = (logs: Log[]): ProjectHours[] => {
  const array: ProjectHours[] = [];
  const sorted = {};
  logs.forEach(log => {
    if (sorted[log.project.name]) {
      sorted[log.project.name].push(log);
    } else {
      sorted[log.project.name] = [log];
    }
  });
  Object.keys(sorted).map(key => {
    array.push({
      project: key,
      hours: sorted[key].reduce((a: number, b: Log) => {
        return a + b.duration;
      }, 0) // tslint:disable-line
    });
  });
  return array;
};

export const InvoiceDocumentView = (props: Props) => (
  <ViewWrapper id="InvoicePDF">
    <InvoiceHeader>
      <AddressWrapper>
        <div className="address">
          <span className="name">Brandon Lee</span>
          <span className="street">5582 Windy Knoll Dr</span>
          <span className="city-st-zip">Loves Park IL, 61111</span>
          <span className="email">brandonlee781@gmail.com</span>
        </div>
      </AddressWrapper>
      <InfoWrapper>
        <h3>INVOICE</h3>
        <div className="info-box">
          <div className="date">DATE: {props.date}</div>
          <div className="number"><span>INVOICE #</span><span>{[props.number]}</span></div>
          <div className="customer">
            <div>
              <span>CUSTOMER ID</span>
              <span>1</span>
            </div>
            <span>STERLING DATABASES</span>
          </div>
        </div>
      </InfoWrapper>
    </InvoiceHeader>
    <ViewBody>
      <h4>Sterling Databases</h4>
      <ViewTable>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th className="unit-price">UNIT PRICE</th>
            <th className="amount">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {hoursPerProject(props.logs).map((p, ind) => (
            <tr key={ind}>
              <td className="project-name">{p.project}</td>
              <td className="project-hours">{p.hours}</td>
              <td className="unit-price">${props.rate}</td>
              <td className="amount">{(p.hours * props.rate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </ViewTable>
      <Totals>
        <div className="subtotal">
          <span>SUBTOTAL</span>
          <span>${(props.hours * props.rate).toFixed(2)}</span>
        </div>
        <div className="tax">
          <span>TAX RATE</span>
          <span>$0.00</span>
        </div>
        <div className="total">
          <span>TOTAL</span>
          <span>${(props.hours * props.rate).toFixed(2)}</span>
        </div>
      </Totals>
    </ViewBody>
  </ViewWrapper>
);