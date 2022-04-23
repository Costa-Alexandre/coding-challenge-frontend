const sumOrders = (orders) => {
  const result = orders.reduce((acc, order) => {
    console.log('acc', acc);
    console.log('order Volume', order.orderVolume);
    return acc + order.orderVolume;
  }, 0);
  return result;
};

export { sumOrders };
