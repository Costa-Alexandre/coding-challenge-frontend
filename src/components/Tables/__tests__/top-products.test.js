import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import TopProducts from "../top-products";

describe('TopProducts', () => {
  it('should render a top products table', async () => {
    const orders = [
      {
        orderNumber: 1,
        orderVolume: 100,
        product: 'foo',
        day: 1,
        month: 1,
        year: 2020,
      },
      {
        orderNumber: 2,
        orderVolume: 200,
        product: 'bar',
        day: 1,
        month: 1,
        year: 2020,
      },
      {
        orderNumber: 3,
        orderVolume: 300,
        product: 'foo',
        day: 1,
        month: 1,
        year: 2020,
      },
    ];

    await act(() => {
      render(<TopProducts orders={orders} total={600} />);
    });

    expect(screen.getByText(/TOP 5 PRODUCTS/i)).toBeInTheDocument();
    expect(screen.getByText(/foo/i)).toBeInTheDocument();
    expect(screen.getByText(/bar/i)).toBeInTheDocument();
    expect(screen.getByText(/400/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
  });
});
