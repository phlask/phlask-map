import { useMemo, useState } from 'react';
import debounce from 'utils/debounce';
import useGetGooglePlacePredictionsQuery from './queries/useGetGooglePlacePredictionsQuery';

const useGooglePlacesAutocomplete = () => {
  const [input, setInput] = useState('');
  const {
    data: suggestions,
    isFetching,
    error
  } = useGetGooglePlacePredictionsQuery(input);

  const onChange = useMemo(
    () =>
      debounce((input: string) => {
        setInput(input || '');
      }, 500),
    []
  );

  return { suggestions, isFetching, error, onChange };
};

export default useGooglePlacesAutocomplete;
