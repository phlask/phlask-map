import { useQuery } from '@tanstack/react-query';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';

const useGetGooglePlaceById = () => {
  const { placeId } = useActiveSearchLocation();
  const { data, isPending } = useQuery({
    queryKey: ['place-id', placeId],
    queryFn: async () => {
      if (!placeId) {
        return Promise.reject('Place should exist');
      }

      const { place } = await new google.maps.places.Place({
        id: placeId
      }).fetchFields({
        fields: ['displayName', 'formattedAddress', 'addressComponents']
      });

      return place;
    },
    enabled: Boolean(placeId)
  });

  return { data, isPending };
};

export default useGetGooglePlaceById;
