import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDonasi(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/donasi' : null, fetcher);

  return {
    data: {
      publish: data?.data.filter((item: any) => item.is_close === 0),
      draft: data?.data.filter((item: any) => item.is_close === 1)
    },
    isLoading: !error && !data,
    isError: error
  };
}

export default useDonasi;
