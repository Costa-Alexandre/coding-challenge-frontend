import React from 'react';
import Arrows from './Arrows';
import '../NavBar.css';

export default function NavBar({ month, year, callback }) {
  const handleClick = (direction) => {
    console.log(direction, 'from navbar');
    return callback(direction);
  };

  return (
    <div id="navbar-container">
      <div id="navbar-title">Order Dashboard</div>
      <div id="navbar-main">
        <div id="navbar-date">
          {month} {year}
        </div>
        <Arrows callback={handleClick} />
      </div>
    </div>
  );
}
