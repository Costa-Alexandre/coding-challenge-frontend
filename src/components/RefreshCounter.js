import React, { useState, useEffect } from 'react';
import '../styles/RefreshCounter.css';

export default function RefreshCounter({ callback }) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        if (counter > 1) {
          setCounter(counter - 1);
        } else if (counter === 1) {
          setCounter(60);
          callback();
        }
      }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter, callback]);

  return (
    <div className="refresh-container">
      <span id="refresh-main">Refresh in </span>
      <span id="time">{counter}</span>
    </div>
  );
}
