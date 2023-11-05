import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePublicKemenanganBySlug(mounted: boolean, slug: string) {
  const { data, error } = useSWR(
    mounted ? `/api/kemenangan/public/slug?slug=${slug}` : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default usePublicKemenanganBySlug;
