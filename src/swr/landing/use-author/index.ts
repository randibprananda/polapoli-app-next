import useSWR from 'swr';
import fetcher from '../../fetcher';

function useAuthorDetail(mounted: boolean, id: string | number) {
  const { data, error } = useSWR(
    mounted ? `/api/landing/articles/author?id=${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAuthorDetail;
