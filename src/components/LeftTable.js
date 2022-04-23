import React, { useEffect } from 'react';
import '../styles/Tables.css';

export default function LeftTable({ orders }) {
  useEffect(() => {
    console.log('filtered orders', orders);
  }, [orders]);

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
        <tbody>
          <tr>
            <td>353</td>
            <td>31.01.2022</td>
            <td>Black Sand Magic</td>
            <td className="bold right-align">135,33 €</td>
          </tr>
          <tr>
            <td>352</td>
            <td>30.01.2022</td>
            <td>White Flower Perfume</td>
            <td className="bold right-align">5.101,94 €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
