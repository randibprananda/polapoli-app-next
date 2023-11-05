import useSWR from 'swr';
import fetcher from '../../fetcher';

function useAddOn(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/landing/add-on' : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useAddOn;
