import React from 'react';
import '../styles/ProgressBar.css';
import currencyFormat from '../helpers/currencyFormat';

export default function ProgressBar({
  progress = 0,
  maxTarget,
  currentTarget,
}) {
  const targetLeftStyle = { left: `${(currentTarget / maxTarget) * 100}%` };
  const progressWidthStyle = { width: `${progress * 100}%` };

  return (
    <>
      <div className="gray bar"></div>
      <div className="blue bar" style={progressWidthStyle}></div>
      <div className="value" style={targetLeftStyle}>
        {currencyFormat(currentTarget, 0)}
      </div>
      <div className="mark" style={targetLeftStyle}></div>
    </>
  );
}
