import useSWR from 'swr';
import { JENIS_SURVEY } from '../../../constant';
import fetcher from '../../fetcher';

interface JadwalKunjunganRelawanQueryInterface {
  mounted: boolean;
  page: any;
  search: string;
  type: JENIS_SURVEY;
}

function useJadwalKunjuanganRelawan({
  mounted,
  page = 1,
  search = '',
  type = JENIS_SURVEY.All
}: JadwalKunjunganRelawanQueryInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/koordinator/jadwal-kunjungan-relawan?page=${page}&search=${search}&jenis_survey=${
          type === 'all' ? '' : type
        }`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useJadwalKunjuanganRelawan;
