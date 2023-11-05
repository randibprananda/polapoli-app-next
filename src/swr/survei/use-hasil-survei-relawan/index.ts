import useSWR from 'swr';
import fetcher from '../../fetcher';

interface HasilSurveiRelawanQueryInterface {
  mounted: boolean;
  page: any;
  search: string;
  daerah: {
    propinsi?: number | string | null;
    kota?: number | string | null;
    kecamatan?: number | string | null;
    kelurahan?: number | string | null;
  };
  type: string;
}

function useHasilSurveiRelawan({
  mounted,
  page = 1,
  search = '',
  daerah = {
    propinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: ''
  },
  type
}: HasilSurveiRelawanQueryInterface) {
  const { propinsi, kota, kecamatan, kelurahan } = daerah;
  const { data, error } = useSWR(
    mounted
      ? `/api/survei/result-by-relawan?page=${page}&search=${search}&propinsi=${
          propinsi || ''
        }&kabupaten=${kota || ''}&kecamatan=${kecamatan || ''}&keluarahan=${
          kelurahan || ''
        }&type=${type}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useHasilSurveiRelawan;
