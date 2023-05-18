import styles from './tables.module.css';
import { formatCurrency } from '../../utils';
import { montserratNormal } from '../../fonts';
import { getTopProducts } from './helpers';

export default function TopProducts({ orders, total }) {
  const topProducts = getTopProducts(orders, 5);

  return ( topProducts.length === 0 ? <table>No data</table> :
    (<table>
      <thead>
        <tr>
          <th>TOP 5 PRODUCTS</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody className={montserratNormal.className}>
        <TableRows topProducts={topProducts} total={total} />
      </tbody>
    </table>)
  );
}

const TableRows = ({ topProducts, total }) => topProducts.map((order, i) => {
  const [product, volume] = order;
  const barWidth = (volume / total) * 100;

  return (
    // eslint-disable-next-line react/no-array-index-key
    <tr key={i}>
      <td>{product}</td>
      <td>
        <div className={styles.bar} style={{ width: `${barWidth}%` }} />
      </td>
      <td>{formatCurrency(volume)}</td>
    </tr>
  );
});
