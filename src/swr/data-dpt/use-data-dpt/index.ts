import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDPTdata(
  mounted: boolean,
  kelurahan: string | number | null,
  page: any = 1,
  search: string = ''
) {
  const { data, error } = useSWR(
    mounted && kelurahan
      ? `/api/data-dpt?kelurahan=${kelurahan}&page=${page}&search=${search}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDPTdata;
