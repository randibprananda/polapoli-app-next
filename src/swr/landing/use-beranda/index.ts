import useSWR from 'swr';
import fetcher from '../../fetcher';

function useBeranda(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/beranda' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useBeranda;
