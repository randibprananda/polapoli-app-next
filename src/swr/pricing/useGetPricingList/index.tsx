import useSWR from 'swr';
import fetcher from '../../fetcher';

const useGetListPricing = (mounted: boolean, tabPrice: number) => {
  const { data, error } = useSWR(
    mounted ? `/api/pricing/list-pricing?division_id=${tabPrice}` : null,
    fetcher
  );
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useGetListPricing;
