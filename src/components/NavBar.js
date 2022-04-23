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
    currentMonth.getMonth() === intervalArray[0].getMonth() &&
    currentMonth.getFullYear() === intervalArray[0].getFullYear()
      ? setDisablePrev(true)
      : setDisablePrev(false);
    currentMonth.getMonth() ===
      intervalArray[intervalArray.length - 1].getMonth() &&
    currentMonth.getFullYear() ===
      intervalArray[intervalArray.length - 1].getFullYear()
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
