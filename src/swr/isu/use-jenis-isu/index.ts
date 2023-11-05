import useSWR from 'swr';
import fetcher from '../../fetcher';

function useJenisIsu() {
  const { data, error } = useSWR('/api/isu/jenis-isu', fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useJenisIsu;
