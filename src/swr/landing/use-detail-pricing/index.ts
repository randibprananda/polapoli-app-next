import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailPricing(mounted: boolean, id: number | string) {
  const { data, error } = useSWR(
    mounted ? `/api/landing/detail-pricing?id=${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailPricing;
