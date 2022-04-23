const sumOrders = (orders) => {
  return orders.reduce((acc, order) => acc + order.orderVolume, 0);
};

export { sumOrders };
