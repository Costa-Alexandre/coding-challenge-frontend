import classNames from 'classnames';
import Link from 'next/link';
import styles from './arrow.module.css';
import { getMonthPath } from './helpers';

const classes = classNames.bind(styles);

export default function Arrow({ direction = 1, disabled = false }) {
  return (
    <Link
      className={classes(styles.button, {
        [`${styles.disabled}`]: disabled,
      })}
      href={!disabled ? getMonthPath(direction) : '#'}
    >
      <div
        className={classes(styles.arrow, {
          [`${styles.left}`]: direction === -1,
          [`${styles.right}`]: direction === 1,
        })}
      >
        <i />
      </div>
    </Link>
  );
}
