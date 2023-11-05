import useSWR from 'swr';
import fetcher from '../../fetcher';

function useFeed(mounted: boolean, page: any, search: string) {
  const { data, error } = useSWR(
    mounted ? `/api/feed?page=${page}&search=${search}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useFeed;
