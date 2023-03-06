export const getDates = (orders) => {
  const firstYear = Math.min(...orders.map((order) => order.year));
  const lastYear = Math.max(...orders.map((order) => order.year));
  const firstMonth = Math.min(
    ...orders
      .filter((order) => order.year === firstYear)
      .map((order) => order.month),
  );
  const lastMonth = Math.max(
    ...orders
      .filter((order) => order.year === lastYear)
      .map((order) => order.month),
  );

  return {
    firstYear,
    lastYear,
    firstMonth,
    lastMonth,
  };
};

export const getSlugs = (orders) => {
  const { firstYear, lastYear, firstMonth, lastMonth } = getDates(orders);

  const totalMonths = (lastYear - firstYear) * 12 + lastMonth - firstMonth + 1;

  const slugs = [];
  for (let m = 0; m < totalMonths; m += 1) {
    const year = firstYear + Math.floor((firstMonth - 1 + m) / 12);
    const month = ((firstMonth - 1 + m) % 12) + 1;

    slugs.push({
      params: {
        slug: [`${year}`, `${month}`],
      },
    });
  }

  return slugs;
};
