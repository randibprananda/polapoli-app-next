import useSWR from 'swr';
import fetcher from '../../fetcher';

function useSaksiByKelurahan(
  mounted: boolean,
  kelurahan_id: number,
  search: string = ''
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/saksi/byKelurahan/?kelurahan_id=${kelurahan_id}?search=${search}`
      : null,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useSaksiByKelurahan;
