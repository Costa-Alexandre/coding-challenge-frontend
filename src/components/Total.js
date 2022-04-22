import React from 'react';
import '../Total.css';

export default function Total({ sum }) {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div id="sum" aria-label="sum">
      {formatter.format(sum)} €
    </div>
  );
}
