import React from 'react';

export default function Total({ sum }) {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <div aria-label="sum">{formatter.format(sum)} €</div>;
}
