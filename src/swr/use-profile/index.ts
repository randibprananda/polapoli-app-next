import useSWR from 'swr';
import fetcher from '../fetcher';

function useProfile(mounted: boolean) {
  const { data, error } = useSWR(mounted ? '/api/profile' : null, fetcher);

  return {
    data: data,
    role: data?.data?.user_role_tim[0]?.role,
    isLoading: !error && !data,
    isError: error
  };
}

export default useProfile;
