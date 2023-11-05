import useSWR from 'swr';
import fetcher from '../../fetcher';

interface HeatmapInterface {
  mounted: boolean;
  survei: string | null;
  relawan: string | null;
  page: string | null;
  token: string | null;
}

function useHeatmap({
  mounted,
  survei,
  relawan,
  page,
  token
}: HeatmapInterface) {
  const { data, error } = useSWR(
    mounted
      ? `/api/survei/heatmap?survei=${survei}&relawan=${relawan}&page=${page}&token=${token}`
      : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
}

export default useHeatmap;
