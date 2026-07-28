import { useQuery, skipToken } from '@tanstack/react-query';

const useGetGooglePlaceByIdQuery = (placeId: string | null) => {
  const { data, isPending } = useQuery({
    queryKey: ['place-id', placeId],
    queryFn: placeId ? () =>
      new google.maps.places.Place({
        id: placeId
      }).fetchFields({
        fields: [
          'displayName',
          'formattedAddress',
          'addressComponents',
          'types'
        ]
      }).then(({ place }) => place) : skipToken,
  });

  return { data, isPending };
};

export default useGetGooglePlaceByIdQuery;
