import useSWR from 'swr';
import fetcher from '../../fetcher';

const useGetDivisionList = (mounted: boolean) => {
  const { data, error } = useSWR(
    mounted ? 'api/pricing/list-division/' : null,
    fetcher
  );
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useGetDivisionList;
