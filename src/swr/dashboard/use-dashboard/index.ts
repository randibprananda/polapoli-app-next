import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDashboard(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/dashboard' : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDashboard;
