import useSWR from 'swr';
import fetcher from '../../fetcher';

function useVirtualAccount(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/donasi/list-virtual-account' : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useVirtualAccount;
