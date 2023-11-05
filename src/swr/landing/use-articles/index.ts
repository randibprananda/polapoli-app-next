import useSWR from 'swr';
import fetcher from '../../fetcher';

function useArticles(
  mounted: boolean,
  category: string | number,
  page: number | string
) {
  const { data, error } = useSWR(
    mounted ? `/api/landing/articles?page=${page}&category=${category}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useArticles;
