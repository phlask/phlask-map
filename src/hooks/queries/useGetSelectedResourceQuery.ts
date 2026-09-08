import { skipToken, useQuery } from '@tanstack/react-query';
import useSelectedResource from 'hooks/useSelectedResource';
import { getResourceById } from 'services/db';

export const useGetSelectedResourceQuery = () => {
  const { selectedResource } = useSelectedResource();
  const {
    data = null,
    isError,
    isEnabled
  } = useQuery({
    queryKey: ['selected-resource', selectedResource],
    queryFn: selectedResource ? () => getResourceById(selectedResource) : skipToken,
    retry: false
  });

  return { data, isError, isEnabled };
};
