import React from 'react';
import '../Arrows.css';

export default function Arrows({ callback }) {
  return (
    <div id="arrows-container">
      <button
        aria-label="previous month"
        className="arrow-buttons"
        onClick={() => callback('prev')}
      >
        <i className="square">
          <i className="left arrow"></i>
        </i>
      </button>
      <button
        aria-label="next month"
        className="arrow-buttons"
        onClick={() => callback('next')}
      >
        <i className="square">
          <i className="right arrow"></i>
        </i>
      </button>
    </div>
  );
}
