import useSWR from 'swr';
import fetcher from '../../fetcher';

function useTPS(
  mounted: boolean,
  propinsi_id: any,
  kabupaten_id: any,
  kecamatan_id: any,
  kelurahan_id: any | null = null
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/data-master/tps?propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useTPS;
