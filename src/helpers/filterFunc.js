const sumOrders = (orders) => {
  return orders.reduce((acc, order) => acc + order.orderVolume, 0);
};

const filterOrdersMonth = (orders, month) => {
  return orders.filter((order) => order.orderDate.getMonth() + 1 === month);
};

export { sumOrders, filterOrdersMonth };
