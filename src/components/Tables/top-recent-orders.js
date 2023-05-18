import { formatCurrency } from '../../utils';
import { formatDate } from './helpers';
import { montserratNormal } from '../../fonts';

export default function TopRecentOrders({ orders }) {
  return ( orders.length === 0 ? <table>No data</table> :
    (<table>
      <thead>
        <tr>
          <th>NR</th>
          <th>DATE</th>
          <th>PRODUCT NAME</th>
          <th>ORDER VOLUME</th>
        </tr>
      </thead>
      <tbody className={montserratNormal.className}>
        <TableRows orders={orders} maxRows={5} />
      </tbody>
    </table>)
  );
}

const TableRows = ({ orders, maxRows = 5 }) => orders
  .slice(0, maxRows)
  .map(({ orderNumber, orderVolume, product, day, month, year }, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <tr key={i}>
      <td>{orderNumber}</td>
      <td>{formatDate(year, month, day)}</td>
      <td>{product}</td>
      <td>{formatCurrency(orderVolume)}</td>
    </tr>
  ));
