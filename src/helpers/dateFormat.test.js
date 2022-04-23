import { toDate, toMonthYYYY } from './dateFormat';

describe('toDate()', () => {
  it('should convert string to date', () => {
    expect(toDate('09.02.2021')).toEqual(new Date(2021, 1, 9));
    expect(toDate('25.02.2021')).toEqual(new Date(2021, 1, 25));
    expect(toDate('18.03.2021')).toEqual(new Date(2021, 2, 18));
    expect(toDate('21.02.2022')).toEqual(new Date(2022, 1, 21));
  });

  it('should return correct monthYYYY', () => {
    expect(toMonthYYYY(new Date(2021, 1, 9))).toBe('February 2021');
    expect(toMonthYYYY(new Date(2021, 1, 25))).toBe('February 2021');
    expect(toMonthYYYY(new Date(2021, 2, 18))).toBe('March 2021');
    expect(toMonthYYYY(new Date(2022, 1, 21))).toBe('February 2022');
  });
});
