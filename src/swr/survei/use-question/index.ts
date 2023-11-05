import useSWR from 'swr';
import fetcher from '../../fetcher';

function useQuestion(mounted: boolean, id: string | number) {
  const { data, error } = useSWR(
    mounted ? `/api/survei/question?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useQuestion;
