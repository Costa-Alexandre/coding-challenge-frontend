import formatDate from '../format-date';

describe('formatDate', () => {
  it('should return a formatted date', () => {
    const result = formatDate(2020, 1, 1);

    expect(result).toBe('01.01.2020');
  });

  it('should return a month in the following year', () => {
    const result = formatDate(2020, 13, 1);

    expect(result).toBe('01.01.2021');
  });

  it('should return a default message when no arguments are passed', () => {
    const result = formatDate();

    expect(result).toBe('Invalid Date');
  });

  it('should return a default message when invalid arguments are passed', () => {
    const result = formatDate('foo', 'bar', 'baz');

    expect(result).toBe('Invalid Date');
  });
});
