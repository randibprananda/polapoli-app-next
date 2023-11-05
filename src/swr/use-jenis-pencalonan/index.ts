import useSWR from 'swr';
import fetcher from '../fetcher';

function useJenisPencalonan() {
  const { data, error } = useSWR(
    '/api/pasangan-calon/jenis-pencalonan',
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useJenisPencalonan;
