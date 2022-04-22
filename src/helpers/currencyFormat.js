const currencyFormat = (value, digits = 2) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return `${formatter.format(value)} €`;
};

export default currencyFormat;
