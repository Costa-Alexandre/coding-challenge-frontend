import {
  Background,
  NavBar,
  ProgressBar,
  Tables,
  RefreshCounter,
  UserMenu,
} from '../components';

import {
  getOrders,
  getTargets,
  getSlugs,
  getDates,
  getTotal,
  filterAndSortOrders,
} from '../utils';

export default function App({ orders, target, monthName, dates }) {
  const total = getTotal(orders);

  return (
    <main>
      <section>
        <Background />
        <UserMenu />
        <NavBar monthName={monthName} dates={dates} />
        <RefreshCounter orders={orders} target={target} />
        <ProgressBar total={total} target={target} />
      </section>
      <section>
        <Tables orders={orders} total={total} />
      </section>
    </main>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  const orders = await getOrders();
  const targets = await getTargets();

  const { lastYear, lastMonth, firstYear, firstMonth } = getDates(orders);
  // default to last month
  const year = slug ? parseInt(slug[0], 10) : lastYear;
  const month = slug ? parseInt(slug[1], 10) : lastMonth;

  const sortedOrders = filterAndSortOrders(orders, year, month);

  const { target, month: monthName } = targets[month - 1];

  return {
    props: {
      target,
      monthName,
      year,
      orders: sortedOrders,
      dates: { lastYear, lastMonth, firstYear, firstMonth },
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const orders = await getOrders();
  const paths = getSlugs(orders);

  return {
    paths,
    fallback: false,
  };
}
