import { useQuery } from '@tanstack/react-query';
import useSelectedResource from 'hooks/useSelectedResource';
import { getResourceById } from 'db';

export const useGetSelectedResourceQuery = () => {
  const { selectedResource } = useSelectedResource();
  const {
    data = null,
    isError,
    isEnabled
  } = useQuery({
    queryKey: ['selected-resource', selectedResource],
    queryFn: () => getResourceById(selectedResource!),
    enabled: !!selectedResource,
    retry: false
  });

  return { data, isError, isEnabled };
};
