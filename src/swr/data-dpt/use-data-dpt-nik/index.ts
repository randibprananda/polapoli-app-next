import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDPTdataByNIK(
  mounted: boolean,
  nik: string | number | null,
  isPemilih: '1' | '0' = '0'
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/data-dpt/search-by-nik?nik=${nik}&isPemilih=${isPemilih}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDPTdataByNIK;
