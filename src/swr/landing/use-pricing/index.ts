import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePricing(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/pricing' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePricing;
