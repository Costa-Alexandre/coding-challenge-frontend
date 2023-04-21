import { getOrders, getTargets } from '../fetch';

global.fetch = jest.fn();

describe('getOrders', () => {
  const MockOrdersResponse = {
    values: [
      ['Order Number', 'Order Date', 'Product', 'Order Volume'],
      [1, '01.01.2021', 'Product 1', 1000],
      [2, '01.01.2021', 'Product 2', 2000],
      [3, '01.01.2021', 'Product 3', 3000],
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should return an array of orders', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(MockOrdersResponse),
    });

    const result = await getOrders();

    expect(result).toEqual([
      {
        day: 1,
        month: 1,
        orderNumber: 1,
        orderVolume: 1000,
        product: 'Product 1',
        year: 2021,
      },
      {
        day: 1,
        month: 1,
        orderNumber: 2,
        orderVolume: 2000,
        product: 'Product 2',
        year: 2021,
      },
      {
        day: 1,
        month: 1,
        orderNumber: 3,
        orderVolume: 3000,
        product: 'Product 3',
        year: 2021,
      },
    ]);
  });
});

describe('getTargets', () => {
  const MockTargetsResponse = {
    values: [
      ['Month', 'Target'],
      ['January', '€100,000'],
      ['February', '€200,000'],
      ['March', '€300,000'],
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should return an array of targets', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(MockTargetsResponse),
    });
    const result = await getTargets();

    expect(result).toEqual([
      {
        month: 'January',
        target: 100000,
      },
      {
        month: 'February',
        target: 200000,
      },
      {
        month: 'March',
        target: 300000,
      },
    ]);
  });
});
