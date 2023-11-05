import useSWR from 'swr';
import fetcher from '../../fetcher';

function useLogKoordinator(
  mounted: boolean,
  id: number | string,
  page: number | string
) {
  const { data, error } = useSWR(
    mounted ? `/api/log-aktivitas/koordinator?id=${id}&page=${page}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useLogKoordinator;
