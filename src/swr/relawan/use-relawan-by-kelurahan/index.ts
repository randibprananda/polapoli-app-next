import useSWR from 'swr';
import fetcher from '../../fetcher';
import Search from 'antd/lib/transfer/search';

function useRelawanByKelurahan(
  mounted: boolean,
  kelurahan_id: number,
  search: string = ''
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/relawan/byKelurahan/?kelurahan_id=${kelurahan_id}?search=${search}`
      : null,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRelawanByKelurahan;
