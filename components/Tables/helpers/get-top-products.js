const aggregateOrdersByName = (orders) => {
  const ordersByName = {};
  orders.forEach((order) => {
    if (ordersByName[order.product]) {
      ordersByName[order.product] += order.orderVolume;
    } else {
      ordersByName[order.product] = order.orderVolume;
    }
  });
  return ordersByName;
};

export default function getTopProducts(orders, quantity) {
  return Object.entries(aggregateOrdersByName(orders))
    .sort((a, b) => b[1] - a[1])
    .slice(0, quantity);
}
