import { getOrders } from '../utils/fetch';
import { getDates } from '../utils/get-slugs';

export default function App() {}

export async function getServerSideProps() {
  const orders = await getOrders();

  const dates = getDates(orders);
  const { lastYear, lastMonth } = dates;
  const year = lastYear;
  const monthNumber = lastMonth;

  return {
    redirect: {
      destination: `/${year}/${monthNumber}`,
      permanent: false,
    },
  };
}
