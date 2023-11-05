import useSWR from 'swr';
import fetcher from '../../fetcher';

function useDetailSurvei(mounted: boolean, id: string | number) {
  console.log('id ini ', id);
  const { data, error } = useSWR(
    mounted ? `/api/survei?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useDetailSurvei;
