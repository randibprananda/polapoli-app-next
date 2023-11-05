import useSWR from 'swr';
import fetcher from '../../fetcher';

function useRekapitulasiDPT(
  mounted: boolean,
  propinsi_id: number | string,
  kabupaten_id: number | string,
  kecamatan_id: number | string
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/rekapitulasi/dpt?propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRekapitulasiDPT;
