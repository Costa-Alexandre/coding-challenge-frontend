import { useQuery } from '../../../hooks';

const getMonthPath = (count) => {
  const { year, month } = useQuery();
  const date = new Date(year, month - 1 + count);

  return `/${date.getFullYear()}/${date.getMonth() + 1}`;
};

export default getMonthPath;
