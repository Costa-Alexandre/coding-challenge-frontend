import { toFloat, currencyFormat } from './currencyFormat';

describe('toFloat()', () => {
  it('should convert string to float', () => {
    expect(toFloat('EUR 1.500,00')).toBe(1500);
    expect(toFloat('1.500,00 €')).toBe(1500);
    expect(toFloat('1.500,00')).toBe(1500);
    expect(toFloat('1.500')).toBe(1500);
    expect(toFloat('1500 €')).toBe(1500);
  });
});

describe('currencyFormat()', () => {
  it('should format currency', () => {
    expect(currencyFormat(1500)).toBe('1.500,00 €');
    expect(currencyFormat(1500, 0)).toBe('1.500 €');
    expect(currencyFormat(1500.01, 2)).toBe('1.500,01 €');
    expect(currencyFormat(1500.01, 0)).toBe('1.500 €');
    expect(currencyFormat(1500.99, 2)).toBe('1.500,99 €');
    expect(currencyFormat(1500.99, 0)).toBe('1.501 €');
  });
});
