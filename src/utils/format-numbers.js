const formatCurrency = (value, digits = 2) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return `${formatter.format(value)} €`;
};

function toDecimal(num) {
  const cleanStr = String(num).replace(/[^0-9.,]/g, '');
  let dotPos = cleanStr.indexOf('.');
  let commaPos = cleanStr.indexOf(',');

  if (dotPos < 0) dotPos = 0;

  if (commaPos < 0) commaPos = 0;

  const dotSplit = cleanStr.split('.');
  const commaSplit = cleanStr.split(',');

  const isDecimalDot = dotPos
    && ((commaPos && dotPos > commaPos)
    || (!commaPos && dotSplit[dotSplit.length - 1].length === 2));

  const isDecimalComma = commaPos
    && ((dotPos && dotPos < commaPos)
    || (!dotPos && commaSplit[commaSplit.length - 1].length === 2));

  let integerPart = cleanStr;
  let decimalPart = '0';
  if (isDecimalComma) {
    [integerPart, decimalPart] = commaSplit;
  }
  if (isDecimalDot) {
    [integerPart, decimalPart] = dotSplit;
  }

  return parseFloat(
    `${integerPart.replace(/\D/g, '')}.${decimalPart.replace(
      /\D/g,
      '',
    )}`,
  );
}

const withLeadingZero = (number) => (number < 10 ? `0${number}` : number);

export { formatCurrency, toDecimal, withLeadingZero };
