import { useQuery } from '@tanstack/react-query';

const useGetGooglePlacePredictionsQuery = (input: string) => {
  const {
    data = [],
    isFetching,
    error
  } = useQuery({
    queryKey: ['google-places-autocomplete', input],
    queryFn: async () => {
      const { places } = await google.maps.places.Place.searchByText({
        textQuery: input,
        fields: ['displayName', 'addressComponents']
      });

      return places;
    },
    enabled: Boolean(input)
  });

  return { data, isFetching, error };
};

export default useGetGooglePlacePredictionsQuery;
