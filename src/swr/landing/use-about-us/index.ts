import useSWR from 'swr';
import fetcher from '../../fetcher';

function useAboutUs(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/about' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAboutUs;
