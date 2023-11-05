import useSWR from 'swr';
import fetcher from '../fetcher';

function usePasanganCalon(
  mounted: boolean,
  page: any = 1,
  search: string = ''
) {
  const { data, error } = useSWR(
    mounted ? `/api/pasangan-calon?page=${page}&search=${search}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePasanganCalon;
