import useSWR from 'swr';
import fetcher from '../../fetcher';

function usePenerimaanLogistik(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/logistik/penerimaan' : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default usePenerimaanLogistik;
