import useSWR from 'swr';
import fetcher from '../../fetcher';

function useRiwayatDonasi(mounted: boolean, id: string | number | null) {
  const { data, error } = useSWR(
    mounted && id ? `/api/donasi/riwayat-donasi?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRiwayatDonasi;
