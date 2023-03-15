import React from 'react';
import '../styles/Arrows.css';

export default function Arrows({ callback, disabledPrev, disabledNext }) {
  return (
    <div id="arrows-container">
      <button
        aria-label="previous month"
        className="arrow-buttons"
        onClick={() => callback('prev')}
        disabled={disabledPrev}
      >
        <i className="square">
          <i className="left arrow"></i>
        </i>
      </button>
      <button
        aria-label="next month"
        className="arrow-buttons"
        onClick={() => callback('next')}
        disabled={disabledNext}
      >
        <i className="square">
          <i className="right arrow"></i>
        </i>
      </button>
    </div>
  );
}
