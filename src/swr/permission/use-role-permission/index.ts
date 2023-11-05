import useSWR from 'swr';
import fetcher from '../../fetcher';

function useRolePermission(mounted: boolean, id: string | number) {
  const { data, error } = useSWR(
    mounted && id ? `/api/permission/role-permission?id=${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useRolePermission;
