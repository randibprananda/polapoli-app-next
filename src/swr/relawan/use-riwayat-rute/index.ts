import useSWR from 'swr';
import fetcher from '../../fetcher';

function useRiwayatRute(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? `/api/relawan/rute/riwayat` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRiwayatRute;
