import useSWR from 'swr';
import fetcher from '../../fetcher';

function useAccessManagement(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/permission' : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAccessManagement;
