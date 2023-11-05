import useSWR from 'swr';
import fetcher from '../../fetcher';

interface IsuQueryInterface {
  mounted: boolean;
  page: any;
  search: string;
  jenisIsu: number | string;
}

function useIsu({ mounted, page, search, jenisIsu }: IsuQueryInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/isu?page=${page}&search=${search}&jenisIsu=${jenisIsu}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useIsu;
