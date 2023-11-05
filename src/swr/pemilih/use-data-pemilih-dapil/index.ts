import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePemilihDataByDapil(mounted: boolean, dapil?: number | string) {
  const { data, error } = useSWR(
    mounted ? `/api/data-pemilih/list-by-dapil?dapil=${dapil}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePemilihDataByDapil;
