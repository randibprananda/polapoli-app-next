import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDapilAvailablePemilih(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? `/api/data-pemilih/dapil-available` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDapilAvailablePemilih;
