import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePemesananLogistik(mounted: boolean, id: number | null = null) {
  const { data, error } = useSWR(
    mounted ? `/api/logistik/pemesanan${id ? `?id=${id}` : ''}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePemesananLogistik;
