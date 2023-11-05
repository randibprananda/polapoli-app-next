import useSWR from 'swr';
import fetcher from '../../fetcher';

function useSaksi(mounted: boolean, page: any = 1, search: string = '') {
  const { data, error } = useSWR(
    mounted ? `/api/saksi?page=${page}&search=${search}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useSaksi;
