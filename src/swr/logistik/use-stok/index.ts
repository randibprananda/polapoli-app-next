import useSWR from 'swr';
import fetcher from '../../fetcher';

function useStokLogistik(mounted: boolean, id: number | null = null) {
  const { data, error } = useSWR(
    mounted ? `/api/logistik/stok${id ? `?id=${id}` : ''}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useStokLogistik;
