import useSWR from 'swr';
import fetcher from '../fetcher';

function useTimRelawan(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/tim-relawan' : null, fetcher);

  return {
    timRelawan: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useTimRelawan;
