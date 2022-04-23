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

const topOrdersArray = (orders, month, year) => {
  const monthOrders = orders.filter(
    (order) =>
      order.orderDate.getMonth() + 1 === month &&
      order.orderDate.getFullYear() === year,
  );
  const aggregatedOrders = aggregateOrders(monthOrders);
  const sortedOrders = aggregatedOrders.sort(
    (b, a) => b.orderVolume - a.orderVolume,
  );
  const slicedOrders = sortedOrders.reverse().slice(0, 5);
  return slicedOrders;
};

const getOrdersMonth = (orders, month, year) => {
  return sumOrders(filterOrdersMonth(orders, month, year));
};

const aggregateOrders = (orders) => {
  const orderProducts = orders.map((order) => order.product);
  const uniqueProducts = orderProducts.filter(
    (product, index, self) => self.indexOf(product) === index,
  );
  const uniqueProductsOrders = uniqueProducts.map((product) => {
    return {
      product,
      orderVolume: orders
        .filter((order) => order.product === product)
        .reduce((acc, order) => acc + order.orderVolume, 0),
    };
  });
  return uniqueProductsOrders;
};

export { sumOrders, filterOrdersMonth, getOrdersMonth, topOrdersArray };
