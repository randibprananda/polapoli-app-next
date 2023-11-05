import useSWR from 'swr';
import fetcher from '../../fetcher';

function useJadwalRute(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? `/api/relawan/rute/jadwal` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useJadwalRute;
