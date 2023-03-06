import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import styles from './refresh-counter.module.css';
import { useQuery } from '../../hooks';
import { refreshData, withLeadingZero } from '../../utils';
import { montserratLight } from '../../fonts';

export default function RefreshCounter({ orders, target }) {
  const TIME_TO_REFRESH = 59;
  const [counter, setCounter] = useState(TIME_TO_REFRESH);
  const [loading, setLoading] = useState(false);
  const { year, month, router } = useQuery();

  const refresh = async () => {
    setLoading(true);
    const { newOrders, newTarget } = await refreshData(year, month);
    if (!isEqual(newOrders, orders) || newTarget !== target) {
      router.reload();
    } else {
      setCounter(TIME_TO_REFRESH);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(
      () => (counter === 1 ? refresh() : setCounter(counter - 1)),
      1000,
    );
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          <span className={montserratLight.className}>Refresh in </span>
          <span className={styles.time}>{withLeadingZero(counter)}</span>
        </>
      ) : (
        <span className={montserratLight.className}>Refreshing...</span>
      )}
    </div>
  );
}
