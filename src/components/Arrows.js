import React from 'react';
import '../Arrows.css';

export default function Arrows() {
  return (
    <div id="arrows-container">
      <button aria-label="previous month" className="arrow-buttons">
        <i className="square">
          <i className="left arrow"></i>
        </i>
      </button>
      <button aria-label="next month" className="arrow-buttons">
        <i className="square">
          <i className="right arrow"></i>
        </i>
      </button>
    </div>
  );
}
