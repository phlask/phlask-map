import { useQuery } from '@tanstack/react-query';
import { getResources, type FetchResourcesOptions } from 'services/db';
import { minutesToMilliseconds } from 'date-fns';

const useGetResourcesQuery = (options: FetchResourcesOptions = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', options],
    queryFn: () => getResources(options),
    staleTime: minutesToMilliseconds(10)
  });

  return { data, isLoading, error };
};

export default useGetResourcesQuery;
