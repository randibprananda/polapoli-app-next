import useSWR from 'swr';
import fetcher from '../../fetcher';

interface SurveiQueryInterface {
  mounted: boolean;
  page?: any;
  search?: string;
  type?: 'educate' | 'survei';
}

function useSurvei({
  mounted,
  page = 1,
  search = '',
  type = 'survei'
}: SurveiQueryInterface) {
  const { data, error } = useSWR(
    mounted ? `/api/survei?page=${page}&search=${search}&type=${type}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useSurvei;
