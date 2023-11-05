import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePresensi(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/dashboard/presensi' : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePresensi;
