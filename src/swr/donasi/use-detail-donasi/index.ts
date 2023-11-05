import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailDonasi(mounted: boolean, id: string | number | null) {
  const { data, error } = useSWR(
    mounted && id ? `/api/donasi/${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailDonasi;
