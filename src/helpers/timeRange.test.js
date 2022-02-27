import { sortDates, monthsDiff, createArrayMonths } from './timeRange.js';
import { toMonthYYYY } from './dateFormat.js';

const recentMonth = new Date(2019, 6, 1);
const oldMonth = new Date(2018, 6, 1);
const d3 = new Date(2018, 12, 1);

const objects = [
  { orderDate: recentMonth },
  { orderDate: oldMonth },
  { orderDate: d3 },
];

describe('timeRange', () => {
  it('should sort dates', () => {
    const sortedDates = sortDates(objects);
    expect(sortedDates[0].orderDate).toEqual(oldMonth);
    expect(sortedDates[1].orderDate).toEqual(d3);
    expect(sortedDates[2].orderDate).toEqual(recentMonth);
  });

  it('should calculate months difference', () => {
    const sortedDates = sortDates(objects);

    const firstMonth = sortedDates[0].orderDate;
    const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
    const periods = monthsDiff(firstMonth, lastMonth);
    expect(periods).toEqual(12);
  });

  it('should create array of months', () => {
    const sortedDates = sortDates(objects);

    const firstMonth = sortedDates[0].orderDate;
    const lastMonth = sortedDates[sortedDates.length - 1].orderDate;
    const periods = monthsDiff(firstMonth, lastMonth);
    const arrayMonths = createArrayMonths(firstMonth, periods);

    expect(toMonthYYYY(arrayMonths[0])).toEqual('June 2018');
    expect(toMonthYYYY(arrayMonths[1])).toEqual('July 2018');
    expect(toMonthYYYY(arrayMonths[7])).toEqual('January 2019');
    expect(arrayMonths.length).toEqual(13);
    expect(toMonthYYYY(arrayMonths[12])).toEqual('June 2019');
  });
});
