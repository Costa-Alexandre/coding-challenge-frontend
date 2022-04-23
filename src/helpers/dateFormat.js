const toDate = (string) => {
  const parse = string.split('.');
  return new Date(parse[2], parse[1] - 1, parse[0]);
};

const toMonthYYYY = (date) => {
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

export { toDate, toMonthYYYY };
