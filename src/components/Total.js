import React from 'react';
import '../styles/Total.css';
import { currencyFormat } from '../helpers/currencyFormat';

export default function Total({ sum }) {
  return (
    <div id="sum" aria-label="sum">
      {currencyFormat(sum)}
    </div>
  );
}
