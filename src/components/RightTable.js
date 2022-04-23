import React, { useEffect } from 'react';
import { currencyFormat } from '../helpers/currencyFormat';

export default function RightTable({ orders, sumOrders }) {
  useEffect(() => {
    console.log('top orders', orders);
  }, [orders]);

  // const progressWidthStyle = { width: `${progress * 100}%` };

  const tableRows = orders.map((order, index) => {
    return (
      <tr key={index}>
        <td>{order.product}</td>
        <td>
          <div
            className="blue-bar"
            style={{ width: `calc(${order.orderVolume / sumOrders} * 400px)` }}
          >
            {order.orderVolume / sumOrders}
          </div>
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
