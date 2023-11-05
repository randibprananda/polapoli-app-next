import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePublicDonasi(
  mounted: boolean,
  slug: string,
  donasi: string | number | null
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/kemenangan/public/donasi?slug=${slug}&donasi=${donasi}`
      : null,
    fetcher
  );
  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default usePublicDonasi;
