import React, { useEffect, useState } from 'react';
import Arrows from './Arrows';
import { toMonthYYYY } from '../helpers/dateFormat';
import '../styles/NavBar.css';

export default function NavBar({ currentMonth, callback, intervalArray }) {
  const [disabledPrev, setDisablePrev] = useState(false);
  const [disabledNext, setDisableNext] = useState(false);

  const handleClick = (direction) => {
    return callback(direction);
  };

  useEffect(() => {
    currentMonth < intervalArray[0].orderDate
      ? setDisablePrev(true)
      : setDisablePrev(false);
    currentMonth > intervalArray[intervalArray.length - 1].orderDate
      ? setDisableNext(true)
      : setDisableNext(false);
  }, [intervalArray, currentMonth]);

  return (
    <div id="navbar-container">
      <div id="navbar-title">Order Dashboard</div>
      <div id="navbar-main">
        <div id="navbar-date">{toMonthYYYY(currentMonth)}</div>
        <Arrows
          callback={handleClick}
          disabledNext={disabledNext}
          disabledPrev={disabledPrev}
        />
      </div>
    </div>
  );
}
