import useSWR from 'swr';
import fetcher from '../fetcher';

function useUser(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/user' : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useUser;
