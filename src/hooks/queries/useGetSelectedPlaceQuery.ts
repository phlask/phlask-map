import { useQuery } from '@tanstack/react-query';
import useSelectedPlace from 'hooks/useSelectedResource';
import { getResourceById } from 'db';

export const useGetSelectedPlaceQuery = () => {
  const { selectedPlace } = useSelectedPlace();
  const {
    data = null,
    isError,
    isEnabled
  } = useQuery({
    queryKey: ['selected-place', selectedPlace],
    queryFn: () => getResourceById(selectedPlace!),
    enabled: !!selectedPlace,
    retry: false
  });

  return { data, isError, isEnabled };
};
