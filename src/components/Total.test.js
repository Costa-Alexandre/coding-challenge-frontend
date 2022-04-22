import { render, screen } from '@testing-library/react';
import Total from './Total';

test('renders sum 5.237,27', () => {
  const sum = 5237.27;
  render(<Total sum={sum} />);
  const sumElement = screen.getByLabelText('sum');
  expect(sumElement).toBeInTheDocument();
  expect(sumElement.innerHTML).toBe('5.237,27 €');
});

test('renders sum 50.10', () => {
  const sum = 50.1;
  render(<Total sum={sum} />);
  const sumElement = screen.getByLabelText('sum');
  expect(sumElement).toBeInTheDocument();
  expect(sumElement.innerHTML).toBe('50,10 €');
});

test('renders sum 16.6666', () => {
  const sum = 50 / 3;
  render(<Total sum={sum} />);
  const sumElement = screen.getByLabelText('sum');
  expect(sumElement).toBeInTheDocument();
  expect(sumElement.innerHTML).toBe('16,67 €');
});
