import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDapilAvailableDPT(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? `/api/data-dpt/dapil-available` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDapilAvailableDPT;
