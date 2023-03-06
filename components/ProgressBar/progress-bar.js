import styles from './progress-bar.module.css';
import { formatCurrency } from '../../utils';
import { robotoLight } from '../../fonts';

export default function ProgressBar({ total, target }) {
  const progress = total / target;

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div>{formatCurrency(total)}</div>
      </div>
      <div className={styles.bar}>
        <i />
        <i style={{ width: `${progress * 80}%` }} />
        <i />
        <div className={robotoLight.className}>
          <div className={styles.value}>{formatCurrency(target, 0)}</div>
        </div>
      </div>
    </div>
  );
}
