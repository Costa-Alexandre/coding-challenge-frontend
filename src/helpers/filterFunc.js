const dummy = [
  {
    orderNumber: '1',
    orderDate: '09.02.2021',
    product: 'Scruncho',
    orderVolume: '8.470,00 €',
  },
  {
    orderNumber: '2',
    orderDate: '25.02.2021',
    product: 'Towlee',
    orderVolume: '6.686,00 €',
  },
  {
    orderNumber: '3',
    orderDate: '18.03.2021',
    product: 'Gymr Kit',
    orderVolume: '5.148,00 €',
  },
  {
    orderNumber: '4',
    orderDate: '18.03.2021',
    product: 'Villafy',
    orderVolume: '4.775,00 €',
  },
];

const sumOrders = (orders) => {
  const result = orders.reduce((acc, order) => {
    console.log('acc', acc);
    console.log('order Volume', order.orderVolume);
    return acc + order.orderVolume;
  }, 0);
  return result;
};

// const x = [{ orderVolume: 1 }, { orderVolume: 1000 }, { orderVolume: -5 }];
// console.log('result', sumOrders(x));

export { dummy, sumOrders };
