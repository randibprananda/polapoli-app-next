import useSWR from 'swr';
import fetcher from '../../fetcher';

function useAlokasiDonasi(mounted: boolean, id: string | number | null) {
  const { data, error } = useSWR(
    mounted && id ? `/api/donasi/alokasi-donasi?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAlokasiDonasi;
