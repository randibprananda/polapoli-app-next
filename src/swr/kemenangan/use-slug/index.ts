import useSWR from 'swr';
import fetcher from '../../fetcher';

function useSlugKemenangan(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/kemenangan/tentang-calon/get-slug' : null,
    fetcher
  );
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useSlugKemenangan;
