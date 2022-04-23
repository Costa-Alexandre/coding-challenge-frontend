const currencyFormat = (value, digits = 2) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return `${formatter.format(value)} €`;
};

function toFloat(num) {
  const cleanStr = String(num).replace(/[^0-9.,]/g, '');
  let dotPos = cleanStr.indexOf('.');
  let commaPos = cleanStr.indexOf(',');

  if (dotPos < 0) dotPos = 0;

  if (commaPos < 0) commaPos = 0;

  const dotSplit = cleanStr.split('.');
  const commaSplit = cleanStr.split(',');

  const isDecimalDot =
    dotPos &&
    ((commaPos && dotPos > commaPos) ||
      (!commaPos && dotSplit[dotSplit.length - 1].length === 2));

  const isDecimalComma =
    commaPos &&
    ((dotPos && dotPos < commaPos) ||
      (!dotPos && commaSplit[commaSplit.length - 1].length === 2));

  let integerPart = cleanStr;
  let decimalPart = '0';
  if (isDecimalComma) {
    integerPart = commaSplit[0];
    decimalPart = commaSplit[1];
  }
  if (isDecimalDot) {
    integerPart = dotSplit[0];
    decimalPart = dotSplit[1];
  }

  return parseFloat(
    `${integerPart.replace(/[^0-9]/g, '')}.${decimalPart.replace(
      /[^0-9]/g,
      '',
    )}`,
  );
}

export { currencyFormat, toFloat };
