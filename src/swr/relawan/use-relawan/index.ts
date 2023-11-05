import useSWR from 'swr';
import fetcher from '../../fetcher';

function useRelawan(mounted: boolean, page: any = 1, search: string = '') {
  const { data, error } = useSWR(
    mounted ? `/api/relawan?page=${page}&search=${search}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRelawan;
