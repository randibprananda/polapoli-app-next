import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePublicKemenangan(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/kemenangan/public/all' : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default usePublicKemenangan;
