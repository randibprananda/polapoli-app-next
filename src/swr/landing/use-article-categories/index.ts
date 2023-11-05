import useSWR from 'swr';
import fetcher from '../../fetcher';

function useArticleCategories(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/articles/categories' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useArticleCategories;
