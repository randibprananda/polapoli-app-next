import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailArticles(mounted: boolean, id: number | string) {
  const { data, error } = useSWR(
    mounted ? `/api/landing/articles/detail?id=${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailArticles;
