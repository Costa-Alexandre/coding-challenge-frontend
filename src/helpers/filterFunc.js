import { sortDates } from './timeRange';

const sumOrders = (orders) => {
  return orders.reduce((acc, order) => acc + order.orderVolume, 0);
};

const filterOrdersMonth = (orders, month, year) => {
  const monthOrders = orders.filter(
    (order) =>
      order.orderDate.getMonth() + 1 === month &&
      order.orderDate.getFullYear() === year,
  );
  const sortedDates = sortDates(monthOrders);
  const slicedOrders = sortedDates.reverse().slice(0, 5);
  return slicedOrders;
};

const getOrdersMonth = (orders, month, year) => {
  return sumOrders(filterOrdersMonth(orders, month, year));
};

export { sumOrders, filterOrdersMonth, getOrdersMonth };
