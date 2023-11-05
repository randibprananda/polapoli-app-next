import useSWR from 'swr';
import fetcher from '../../fetcher';

function useHelp(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/bantuan' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useHelp;
