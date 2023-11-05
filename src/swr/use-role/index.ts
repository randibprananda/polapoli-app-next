import useSWR from 'swr';
import fetcher from '../fetcher';

function useRole(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/role' : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRole;
