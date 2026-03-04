import { useQuery } from '@tanstack/react-query';
import useSelectedResource from 'hooks/useSelectedResource';
import { getResourceProviders } from 'services/db';

export const useGetResourceProvidersQuery = () => {
  const { selectedResource } = useSelectedResource();
  const {
    data = [],
    isError,
    isEnabled
  } = useQuery({
    queryKey: ['resource-providers', selectedResource],
    queryFn: () => getResourceProviders(selectedResource!),
    enabled: !!selectedResource,
    retry: false
  });

  return { data, isError, isEnabled };
};
