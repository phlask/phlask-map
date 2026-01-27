import { useCallback, useMemo, useState } from 'react';
import debounce from 'utils/debounce';
import useGetGooglePlacePredictionsQuery from './queries/useGetGooglePlacePredictionsQuery';

const useGooglePlacesAutocomplete = () => {
  const [input, setInput] = useState('');
  const {
    data: suggestions,
    isFetching,
    error
  } = useGetGooglePlacePredictionsQuery(input);
  const onChange = useCallback((input: string) => {
    setInput(input || '');
  }, []);

  const onDebouncedChange = useMemo(
    () =>
      debounce((input: string) => {
        setInput(input || '');
      }, 500),
    []
  );

  return { suggestions, isFetching, error, onChange, onDebouncedChange };
};

export default useGooglePlacesAutocomplete;
