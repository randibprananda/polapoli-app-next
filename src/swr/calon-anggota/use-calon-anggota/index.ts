import useSWR from 'swr';
import fetcher from '../../fetcher';

interface CalonAnggotaQueryInterface {
  mounted: boolean;
  page: any;
  search: string;
  partai?: number;
}

function useCalonAnggota({
  mounted,
  page = 1,
  search = '',
  partai = undefined
}: CalonAnggotaQueryInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/calon-anggota?page=${page}&search=${search}&partai=${
          partai || ''
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

export default useCalonAnggota;
