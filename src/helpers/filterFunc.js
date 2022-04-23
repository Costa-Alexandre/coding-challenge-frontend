const sumOrders = (orders) => {
  return orders.reduce((acc, order) => acc + order.orderVolume, 0);
};

const filterOrdersMonth = (orders, month) => {
  return orders.filter((order) => order.orderDate.getMonth() + 1 === month);
};

const getOrdersMonth = (orders, month) => {
  return sumOrders(filterOrdersMonth(orders, month));
};

export { sumOrders, filterOrdersMonth, getOrdersMonth };
