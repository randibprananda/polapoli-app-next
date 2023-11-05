import useSWR from 'swr';
import fetcher from '../../fetcher';

type Props = {
  mounted: boolean;
  options: {
    tingkat_koordinator: string;
    propinsi_id: number | string;
    kabupaten_id: number | string;
    kecamatan_id: number | string;
    kelurahan_id: number | string;
    rt: number | string;
    rw: number | string;
  };
};

function useAllKoordinator({
  mounted,
  options: {
    tingkat_koordinator,
    propinsi_id,
    kabupaten_id,
    kecamatan_id,
    kelurahan_id,
    rt,
    rw
  }
}: Props) {
  const { data, error } = useSWR(
    mounted
      ? `/api/koordinator?tingkat_koordinator=${tingkat_koordinator}&propinsi_id=${propinsi_id}&kabupaten_id=${kabupaten_id}&kecamatan_id=${kecamatan_id}&kelurahan_id=${kelurahan_id}&rt=${rt}&rw=${rw}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAllKoordinator;
