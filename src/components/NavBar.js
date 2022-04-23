import React from 'react';
import Arrows from './Arrows';
import { toMonthYYYY } from '../helpers/dateFormat';
import '../styles/NavBar.css';

export default function NavBar({ currentMonth, callback }) {
  const handleClick = (direction) => {
    return callback(direction);
  };

  return (
    <div id="navbar-container">
      <div id="navbar-title">Order Dashboard</div>
      <div id="navbar-main">
        <div id="navbar-date">{toMonthYYYY(currentMonth)}</div>
        <Arrows callback={handleClick} />
      </div>
    </div>
  );
}
