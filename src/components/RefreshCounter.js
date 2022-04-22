import React, { useState, useEffect } from 'react';
import '../RefreshCounter.css';

export default function RefreshCounter() {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        if (counter > 1) {
          setCounter(counter - 1);
        } else if (counter === 1) {
          console.log('refresh');
          setCounter(60);
        }
      }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <div className="refresh-container">
      <span id="refresh-main">Refresh in </span>
      <span id="time">{counter}</span>
    </div>
  );
}
