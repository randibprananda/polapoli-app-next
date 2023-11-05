import useSWR from 'swr';
import fetcher from '../../fetcher';

function useHasilSurvei(
  mounted: boolean,
  id: string | number,
  page: number,
  search: string = ''
) {
  const { data, error } = useSWR(
    mounted
      ? `/api/survei/result?id=${id}&page=${page}&search=${search}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useHasilSurvei;
