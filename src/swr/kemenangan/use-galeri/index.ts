import useSWR from 'swr';
import fetcher from '../../fetcher';

function useGaleriCalon(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/kemenangan/galeri/' : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default useGaleriCalon;
