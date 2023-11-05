import useSWR from 'swr';
import fetcher from '../../fetcher';

function useKontakCalon(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/kemenangan/kontak/' : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default useKontakCalon;
