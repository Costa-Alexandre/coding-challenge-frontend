import React from 'react';
import { currencyFormat } from '../helpers/currencyFormat';

export default function RightTable({ orders, sumOrders }) {
  const tableRows = orders.map((order, index) => {
    return (
      <tr key={index}>
        <td>{order.product}</td>
        <td>
          <div
            className="blue-bar"
            style={{ width: `calc(${order.orderVolume / sumOrders} * 100%)` }}
          ></div>
        </td>
        <td className="right-align bold">
          {currencyFormat(order.orderVolume)}
        </td>
      </tr>
    );
  });

  return (
    <div id="right-table" className="table-container">
      <table>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>TOP 5 PRODUCTS</th>
            <th style={{ width: '70%' }}></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
