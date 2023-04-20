const filterAndSortOrders = (orders, year, month) => orders.filter(
  (order) => order.year === year && order.month === month,
).sort((a, b) => b.day - a.day);

export default filterAndSortOrders;
