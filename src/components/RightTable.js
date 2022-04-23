import React, { useEffect } from 'react';
import { currencyFormat } from '../helpers/currencyFormat';

export default function RightTable({ orders }) {
  useEffect(() => {
    console.log('top orders', orders);
  }, [orders]);

  const tableRows = orders.map((order, index) => {
    return (
      <tr key={index}>
        <td>{order.product}</td>
        <td>
          <div className="blue-bar"></div>
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
            <th>TOP 5 PRODUCTS</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
