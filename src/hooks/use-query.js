import { useRouter } from 'next/router';

export default function useQuery() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return { year: null, month: null };
  const year = parseInt(slug[0], 10);
  const month = parseInt(slug[1], 10);

  return { year, month, router };
}
