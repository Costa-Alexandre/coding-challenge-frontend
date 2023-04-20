import { getOrders } from '../utils/fetch';
import { getDates } from '../utils/get-slugs';

export default function App() {}

export async function getServerSideProps(context) {
  const orders = await getOrders();
  const { message } = context.query;

  const dates = getDates(orders);
  const { lastYear, lastMonth } = dates;
  const year = lastYear;
  const monthNumber = lastMonth;

  const messagePath = message ? `?message=${message}` : '';

  return {
    redirect: {
      destination: `/${year}/${monthNumber}${messagePath}`,
      permanent: false,
    },
  };
}
