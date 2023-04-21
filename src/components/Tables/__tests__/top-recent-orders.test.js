import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import TopRecentOrders from '../top-recent-orders';

describe('TopRecentOrders', () => {
  it('should render a top recent orders table', async () => {
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
      render(<TopRecentOrders orders={orders} />);
    });

    expect(screen.getByText(/PRODUCT NAME/i)).toBeInTheDocument();
    expect((await screen.findAllByText(/foo/i)).length).toBe(2);
    expect(screen.getByText(/bar/i)).toBeInTheDocument();
    expect(screen.getByText(/^1$/i)).toBeInTheDocument();
    expect(screen.getByText(/^2$/i)).toBeInTheDocument();
    expect(screen.getByText(/^300,00 €$/i)).toBeInTheDocument();
  });
})
