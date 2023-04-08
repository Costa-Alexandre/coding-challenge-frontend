import AuthRoute from '../contexts/Auth/AuthRoute';
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
  getDates,
  getTotal,
  filterAndSortOrders,
} from '../utils';

export default function App({ orders, target, monthName, dates, message }) {
  const total = getTotal(orders);

  return (
    <AuthRoute>
      <main>
        <section>
          <Background />
          <UserMenu message={message} />
          <NavBar monthName={monthName} dates={dates} />
          <RefreshCounter orders={orders} target={target} />
          <ProgressBar total={total} target={target} />
        </section>
        <section>
          <Tables orders={orders} total={total} />
        </section>
      </main>
    </AuthRoute>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const { message } = context.query;

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
      message: message || '',
    },
  };
}
