import TopProducts from './top-products';
import TopRecentOrders from './top-recent-orders';
import styles from './tables.module.css';

function Tables({ orders, total }) {
  return (
    <div className={styles.tables}>
      <div className={styles['top-recent']}>
        <TopRecentOrders orders={orders} />
      </div>
      <div className={styles['top-products']}>
        <TopProducts orders={orders} total={total} />
      </div>
    </div>
  );
}

export default Tables;
