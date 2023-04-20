export default function getTotal(orders) {
  if (orders) {
    return orders.reduce((acc, order) => acc + order.orderVolume, 0);
  }

  return 0;
}
