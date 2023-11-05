import useSWR from 'swr';
import fetcher from '../../fetcher';

function useTentangCalon(mounted: boolean, isGuest: boolean = false) {
  const { data, error } = useSWR(
    mounted ? `/api/kemenangan/tentang-calon${isGuest ? '/guest' : ''}` : null,
    fetcher
  );
  // const { data: slug } = useSWR('/api/kemenangan/tentang-calon', fetcher);

  return {
    data: data,
    slug: '',
    isLoading: !error && !data,
    isError: error
  };
}

export default useTentangCalon;
