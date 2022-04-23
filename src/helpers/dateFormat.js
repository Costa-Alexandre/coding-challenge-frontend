const toDate = (string) => {
  const parse = string.split('.');
  return new Date(parse[2], parse[1] - 1, parse[0]);
};

const toMonthYYYY = (date) => {
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

function getMonthFromString(mon) {
  const d = Date.parse(mon + '1, 2012');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const dateToDDMMYYYY = (date) => {
  return `${padTo2Digits(date.getDate())}.${padTo2Digits(
    date.getMonth() + 1,
  )}.${date.getFullYear()}`;
};

export { toDate, toMonthYYYY, getMonthFromString, dateToDDMMYYYY };
