import useSWR from 'swr';
import fetcher from '../../fetcher';

interface FeedShareDetailQueryInterface {
  mounted: boolean;
  id: number;
  page?: any;
  search?: string;
}

function useFeedShareDetail({
  mounted,
  id,
  page = 1,
  search = ''
}: FeedShareDetailQueryInterface) {
  const { data, error } = useSWR(
    mounted ? `/api/feed/share?page=${page}&search=${search}&id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useFeedShareDetail;
