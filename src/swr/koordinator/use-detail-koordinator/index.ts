import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailKoordinator(mounted: boolean, id: any) {
  const { data, error } = useSWR(
    mounted ? `/api/koordinator/detail?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailKoordinator;
