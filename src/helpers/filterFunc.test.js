import { sumOrders, filterOrdersMonth } from './filterFunc';

describe('sumOrders()', () => {
  it('should return the sum of orders', () => {
    const x = [{ orderVolume: 1 }, { orderVolume: 1000 }, { orderVolume: -5 }];
    const result = sumOrders(x);

    expect(result).toBe(996);
  });

  it('should return 0 if array is empty', () => {
    const x = [];
    const result = sumOrders(x);

    expect(result).toBe(0);
  });
});

describe('filterOrdersMonth()', () => {
  it('should return orders for the given month', () => {
    const x = [
      { orderDate: new Date(2020, 0, 1) },
      { orderDate: new Date(2021, 1, 1) },
      { orderDate: new Date(2022, 1, 1) },
      { orderDate: new Date(2020, 1, 1) },
      { orderDate: new Date(2020, 4, 1) },
    ];
    const result = filterOrdersMonth(x, 2);

    expect(result.length).toBe(3);
  });

  it('should return empty array if no orders for the given month', () => {
    const x = [
      { orderDate: new Date(2020, 0, 1) },
      { orderDate: new Date(2020, 1, 1) },
      { orderDate: new Date(2020, 2, 1) },
      { orderDate: new Date(2020, 3, 1) },
      { orderDate: new Date(2020, 4, 1) },
    ];
    const result = filterOrdersMonth(x, 12);

    expect(result.length).toBe(0);
  });
});
