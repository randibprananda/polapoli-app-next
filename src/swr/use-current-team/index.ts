import useSWR from 'swr';
import fetcher from '../fetcher';

function useCurrentTeam(mounted: boolean) {
  const { data, error } = useSWR(
    mounted ? '/api/tim-relawan/current-team' : null,
    fetcher
  );

  return {
    data: data,
    listPermission: data?.permission?.map((item: any) => +item.permission_id),
    isLoading: !error && !data,
    isError: error
  };
}

export default useCurrentTeam;
