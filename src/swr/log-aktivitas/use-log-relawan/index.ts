import useSWR from 'swr';
import fetcher from '../../fetcher';

function useLogRelawan(
  mounted: boolean,
  id: number | string,
  page: number | string
) {
  const { data, error } = useSWR(
    mounted ? `/api/log-aktivitas/relawan?id=${id}&page=${page}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useLogRelawan;
