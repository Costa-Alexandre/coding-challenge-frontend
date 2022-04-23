import React, { useEffect } from 'react';
import { dateToDDMMYYYY } from '../helpers/dateFormat';
import { currencyFormat } from '../helpers/currencyFormat';
import '../styles/Tables.css';

export default function LeftTable({ orders }) {
  useEffect(() => {
    console.log('filtered orders', orders);
  }, [orders]);

  const tableRows = orders.map((order, index) => {
    return (
      <tr key={index}>
        <td>{order.orderNumber}</td>
        <td>{dateToDDMMYYYY(order.orderDate)}</td>
        <td>{order.product}</td>
        <td className="right-align bold">
          {currencyFormat(order.orderVolume)}
        </td>
      </tr>
    );
  });

  return (
    <div id="left-table" className="table-container">
      <table>
        <thead>
          <tr>
            <th>NR</th>
            <th>DATE</th>
            <th>PRODUCT NAME</th>
            <th className="right-align">ORDER VOLUME</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
