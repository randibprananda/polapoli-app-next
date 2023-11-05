import useSWR from 'swr';
import fetcher from '../../fetcher';

interface ListRespondenInterface {
  mounted: boolean;
  page: number | any;
  propinsi_id: number | string | null;
  kabupaten_id: number | string | null;
  kecamatan_id: number | string | null;
  kelurahan_id: number | string | null;
  tps: number | string | null;
}

function useRespondenQuickCount({
  page,
  mounted,
  propinsi_id,
  kabupaten_id,
  kecamatan_id,
  kelurahan_id,
  tps
}: ListRespondenInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/quick-count/list-responden?page=${page}&propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}&tps=${tps}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRespondenQuickCount;
