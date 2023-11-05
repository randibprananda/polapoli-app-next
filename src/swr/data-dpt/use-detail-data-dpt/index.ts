import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailDPT(mounted: boolean, nik: string | number | null) {
  const { data, error } = useSWR(
    mounted && nik ? `/api/data-dpt?nik=${nik}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailDPT;
