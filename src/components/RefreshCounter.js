import React from 'react';
import '../RefreshCounter.css';

export default function RefreshCounter() {
  let countdown = 60;

  return (
    <div className="refresh-container">
      <span id="refresh-main">Refresh in </span>
      <span id="time">{countdown}</span>
    </div>
  );
}
