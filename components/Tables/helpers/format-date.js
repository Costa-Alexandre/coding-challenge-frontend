const formatDate = (year, month, day) => new Date(year, month, day).toLocaleString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export default formatDate;
