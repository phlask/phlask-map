import { useQuery, skipToken } from '@tanstack/react-query';

const PLACE_FIELDS = [
  'displayName',
  'formattedAddress',
  'addressComponents',
  'types'
];

const useGetGooglePlaceByIdQuery = (id: string | null) => {
  const { data, isPending } = useQuery({
    queryKey: ['place-id', id],
    queryFn: id
      ? () =>
          new google.maps.places.Place({ id })
            .fetchFields({ fields: PLACE_FIELDS })
            .then(({ place }) => place)
      : skipToken
  });

  return { data, isPending };
};

export default useGetGooglePlaceByIdQuery;
