import { useQuery } from '@tanstack/react-query';
import filterNullish from 'utils/filterNullish';

const useGetGooglePlacePredictionsQuery = (input: string) => {
  const {
    data = [],
    isFetching,
    error
  } = useQuery({
    queryKey: ['google-places-autocomplete', input],
    queryFn: async () => {
      const { suggestions } =
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          {
            input,
            includedRegionCodes: ['us']
          }
        );

      return filterNullish(
        suggestions.map(suggestion => {
          if (!suggestion.placePrediction) {
            return null;
          }

          return suggestion.placePrediction;
        })
      );
    },
    enabled: Boolean(input)
  });

  return { data, isFetching, error };
};

export default useGetGooglePlacePredictionsQuery;
