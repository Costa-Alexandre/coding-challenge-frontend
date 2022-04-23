const sumOrders = (orders) => {
  const result = orders.reduce((acc, order) => {
    return acc + order.orderVolume;
  }, 0);
  return result;
};

export { sumOrders };
