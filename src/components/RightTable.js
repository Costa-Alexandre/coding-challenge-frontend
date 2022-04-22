import React from 'react';

export default function RightTable() {
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
        <tbody>
          <tr>
            <td>White Flower Perfu...</td>
            <td>
              <div className="blue-bar"></div>
            </td>
            <td className="bold right-align">5.101,94 €</td>
          </tr>
          <tr>
            <td>Black Sand Perfume</td>
            <td>
              <div className="blue-bar"></div>
            </td>
            <td className="bold right-align">135,33 €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
