import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePengeluaranLogistik(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/logistik/pengeluaran' : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePengeluaranLogistik;
