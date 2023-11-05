import useSWR from 'swr';
import fetcher from '../../fetcher';

function useQuickCountPartai(
  mounted: boolean,
  propinsi_id: number | string,
  kabupaten_id: number | string,
  kecamatan_id: number | string,
  kelurahan_id: number | string
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/quick-count/hasil-partai?propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useQuickCountPartai;
