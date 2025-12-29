import { useQuery } from '@tanstack/react-query';
import { getResources, type FetchResourcesOptions } from 'db';
import type { ResourceEntry } from 'types/ResourceEntry';
import testData from 'testData/functionalTest';
import { minutesToMilliseconds } from 'date-fns';

const useGetResourcesQuery = (options: FetchResourcesOptions = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', options],
    queryFn: () => getResources(options),
    initialData: import.meta.env.VITE_CYPRESS_TEST
      ? (testData as ResourceEntry[])
      : undefined,
    staleTime: minutesToMilliseconds(10)
  });

  return { data, isLoading, error };
};

export default useGetResourcesQuery;
