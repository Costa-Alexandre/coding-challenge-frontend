const sortDates = (array) => {
  return array.sort((a, b) => {
    return a.orderDate - b.orderDate;
  });
};

const monthsDiff = (oldMonth, newMonth) => {
  let months;
  months = (newMonth.getFullYear() - oldMonth.getFullYear()) * 12;
  months -= oldMonth.getMonth();
  months += newMonth.getMonth();
  return months <= 0 ? 0 : months;
};

const createArrayMonths = (firstMonth, periods) => {
  const arrayMonths = [];
  for (let i = 0; i < periods; i++) {
    arrayMonths.push(
      new Date(firstMonth.getFullYear(), firstMonth.getMonth() + i, 15),
    );
  }
  return arrayMonths;
};

const createOrdersInterval = (orders) => {
  const sortedDates = sortDates(orders);
  const firstMonth = sortedDates[0].orderDate;
  const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
  const periods = monthsDiff(firstMonth, lastMonth);
  return createArrayMonths(firstMonth, periods + 1);
};

export { sortDates, monthsDiff, createArrayMonths, createOrdersInterval };
