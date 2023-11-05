import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePartai(mounted: boolean, status?: '1' | '0') {
  const { data, error } = useSWR(
    mounted ? `/api/partai?status=${status || ''}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePartai;
