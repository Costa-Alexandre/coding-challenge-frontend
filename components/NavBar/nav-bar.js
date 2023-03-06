import Arrow from './arrow';
import styles from './nav-bar.module.css';
import { montserratBold } from '../../fonts';
import { useQuery } from '../../hooks';

export default function NavBar({ monthName, dates }) {
  const { year, month } = useQuery();

  const disabledPrev = month === dates.firstMonth && year === dates.firstYear;
  const disabledNext = month === dates.lastMonth && year === dates.lastYear;

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>Order Dashboard</div>
      <div className={montserratBold.className}>
        <div className={styles.calendar}>{`${monthName} ${year}`}</div>
        <div className={styles.arrows}>
          <Arrow direction={-1} disabled={disabledPrev} />
          <Arrow direction={1} disabled={disabledNext} />
        </div>
      </div>
    </div>
  );
}
