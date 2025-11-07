import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import { useMemo, useState } from 'react';
import debounce from 'utils/debounce';
import noop from 'utils/noop';

const useGooglePlacesAutocomplete = ({
  onSearch
}: {
  onSearch: (location: google.maps.LatLngLiteral) => void;
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.PlacePrediction[]
  >([]);

  const onChange = useMemo(
    () =>
      debounce((input: string) => {
        if (!input) {
          setSuggestions([]);
          setIsSearching(false);
        }

        setIsSearching(true);
        google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          includedRegionCodes: ['us']
        })
          .then(response =>
            setSuggestions(
              response.suggestions
                .filter(suggestion =>
                  Boolean(suggestion.placePrediction?.mainText?.text ?? false)
                )
                .map(suggestion => suggestion.placePrediction!)
            )
          )
          .catch(noop)
          .finally(() => setIsSearching(false));
      }, 500),
    []
  );

  const onSelect = async (place: google.maps.places.Place) => {
    if (!place.id) {
      return;
    }
    const results = await place.fetchFields({ fields: ['location'] });

    if (!results.place.location) {
      return;
    }

    onSearch(toLatLngLiteral(results.place.location));
  };

  return { suggestions, isSearching, onChange, onSelect };
};

export default useGooglePlacesAutocomplete;
