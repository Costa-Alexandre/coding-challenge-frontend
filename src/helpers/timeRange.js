const d1 = new Date(2019, 6, 1);
const d2 = new Date(2018, 6, 1);
const d3 = new Date(2019, 8, 1);

const objects = [
  { orderDate: d1, name: 'Test 1' },
  { orderDate: d2, name: 'Test 2' },
  { orderDate: d3, name: 'Test 3' },
];

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
  for (let i = -1; i < periods; i++) {
    arrayMonths.push(
      new Date(firstMonth.getFullYear(), firstMonth.getMonth() + i, 15),
    );
  }
  return arrayMonths;
};

export { sortDates, monthsDiff, createArrayMonths };

const sortedDates = sortDates(objects);
const firstMonth = sortedDates[0].orderDate;
const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
const periods = monthsDiff(firstMonth, lastMonth);
const arrayMonths = createArrayMonths(firstMonth, periods);
