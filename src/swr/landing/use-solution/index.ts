import useSWR from 'swr';
import fetcher from '../../fetcher';

function useSolution(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/solution' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useSolution;
