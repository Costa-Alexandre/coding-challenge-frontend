const sumOrders = (orders) => {
  return orders.reduce((acc, order) => acc + order.orderVolume, 0);
};

const filterOrdersMonth = (orders, month, year) => {
  return orders.filter(
    (order) =>
      order.orderDate.getMonth() + 1 === month &&
      order.orderDate.getFullYear() === year,
  );
};

const getOrdersMonth = (orders, month, year) => {
  return sumOrders(filterOrdersMonth(orders, month, year));
};

export { sumOrders, filterOrdersMonth, getOrdersMonth };
