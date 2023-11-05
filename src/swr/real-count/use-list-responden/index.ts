import useSWR from 'swr';
import fetcher from '../../fetcher';

interface ListRespondenInterface {
  mounted: boolean;
  page: number | any;
  propinsi_id: number | string | null;
  kabupaten_id: number | string | null;
  kecamatan_id: number | string | null;
  kelurahan_id: number | string | null;
  isLegislatif: boolean;
}

function useRespondenRealCount({
  page,
  mounted,
  propinsi_id,
  kabupaten_id,
  kecamatan_id,
  kelurahan_id,
  isLegislatif
}: ListRespondenInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/real-count/list-responden?page=${page}&propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}&isLegislatif=${isLegislatif}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRespondenRealCount;
