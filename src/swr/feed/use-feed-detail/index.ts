import useSWR from 'swr';
import fetcher from '../../fetcher';

function useFeedDetail(mounted: boolean, id: number) {
  const { data, error } = useSWR(
    mounted ? `/api/feed/detail?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useFeedDetail;
