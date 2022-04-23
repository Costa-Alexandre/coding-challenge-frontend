import { sortDates, monthsDiff, createArrayMonths } from './timeRange.js';

const d1 = new Date(2019, 6, 1);
const d2 = new Date(2018, 6, 1);
const d3 = new Date(2019, 8, 1);

const objects = [
  { orderDate: d1, name: 'Test 1' },
  { orderDate: d2, name: 'Test 2' },
  { orderDate: d3, name: 'Test 3' },
];

describe('timeRange', () => {
  it('should sort dates', () => {
    const sortedDates = sortDates(objects);
    expect(sortedDates[0].orderDate).toEqual(d2);
    expect(sortedDates[1].orderDate).toEqual(d1);
    expect(sortedDates[2].orderDate).toEqual(d3);
  });

  it('should calculate months difference', () => {
    const sortedDates = sortDates(objects);

    const firstMonth = sortedDates[0].orderDate;
    const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
    const periods = monthsDiff(firstMonth, lastMonth);
    expect(periods).toEqual(14);
  });

  it('should create array of months', () => {
    const sortedDates = sortDates(objects);

    const firstMonth = sortedDates[0].orderDate;
    const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
    const periods = monthsDiff(firstMonth, lastMonth);
    const arrayMonths = createArrayMonths(firstMonth, periods);

    expect(arrayMonths[0].getMonth()).toEqual(5);
    expect(arrayMonths[0].getFullYear()).toEqual(2018);
    expect(arrayMonths[1].getMonth()).toEqual(6);
    expect(arrayMonths[1].getFullYear()).toEqual(2018);
    expect(arrayMonths[7].getMonth()).toEqual(0);
    expect(arrayMonths[7].getFullYear()).toEqual(2019);
    expect(arrayMonths.length).toEqual(15);
  });
});
