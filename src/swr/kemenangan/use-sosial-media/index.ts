import useSWR from 'swr';
import fetcher from '../../fetcher';

function useSosialMediaCalon(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/kemenangan/kontak/sosial-media' : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default useSosialMediaCalon;
