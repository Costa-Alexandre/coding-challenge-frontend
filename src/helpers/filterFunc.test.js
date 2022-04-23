import { sumOrders } from './filterFunc';

test('sumOrders', () => {
  const x = [{ orderVolume: 1 }, { orderVolume: 1000 }, { orderVolume: -5 }];
  const result = sumOrders(x);

  expect(result).toBe(996);
});
