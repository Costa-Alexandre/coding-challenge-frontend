import getTopProducts from '../get-top-products';

describe('getTopProducts', () => {
  it('should return an array of top products', () => {
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

    const result = getTopProducts(orders, 2);

    expect(result).toEqual([
      ['foo', 400],
      ['bar', 200],
    ]);
  });
});
