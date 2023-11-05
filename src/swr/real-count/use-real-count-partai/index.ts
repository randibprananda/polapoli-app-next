import fetcher from '../../fetcher';
import useSWR from 'swr';

function useRealCountPartai(
  mounted: boolean,
  propinsi_id: number | string,
  kabupaten_id: number | string,
  kecamatan_id: number | string,
  kelurahan_id: number | string,
  isLegislatif: number | string
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/real-count/hasil-partai?propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}&isLegislatif=${isLegislatif}`
      : null,
    fetcher
  );

  return {
    meta: data?.meta,
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRealCountPartai;
