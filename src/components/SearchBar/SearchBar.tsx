import { useMemo, useRef, useState } from 'react';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import TextField from '@mui/material/TextField';
import { Autocomplete, debounce, InputAdornment } from '@mui/material';
import noop from 'utils/noop';
import { SearchIcon } from 'icons';
import styles from './SearchBar.module.scss';

type SearchBarProps = { search: (location: google.maps.LatLngLiteral) => void };

const SearchBar = ({ search }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.PlacePrediction[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSelect = async (place: google.maps.places.Place) => {
    if (!place.id) {
      return;
    }
    const results = await place.fetchFields({ fields: ['location'] });

    if (!results.place.location) {
      return;
    }

    search(toLatLngLiteral(results.place.location));
  };

  return (
    <Autocomplete
      fullWidth={false}
      onInputChange={(_event, value) => {
        onChange(value);
      }}
      options={suggestions}
      loading={isSearching}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.text.text}
      onChange={(_event, value, reason) => {
        if (reason !== 'selectOption') {
          return;
        }

        if (!value) {
          return;
        }

        handleSelect(value.toPlace());
      }}
      classes={{ root: styles.root || '' }}
      renderInput={({ InputProps, disabled, fullWidth, id, inputProps }) => (
        <TextField
          id={id}
          autoComplete="off"
          fullWidth={fullWidth}
          disabled={disabled}
          inputMode="search"
          InputProps={{
            ...InputProps,
            autoComplete: 'off',
            sx: { paddingBlock: '16px !important' },
            classes: { adornedStart: styles['search-icon'] || '' },
            startAdornment: (
              <InputAdornment
                classes={{
                  positionStart: styles['search-icon'] || '',
                  hiddenLabel: styles['search-icon'] || ''
                }}
                position="start"
              >
                <SearchIcon height={24} width={24} />
              </InputAdornment>
            ),
            disableUnderline: true
          }}
          inputProps={{ ...inputProps }}
          size="small"
          inputRef={inputRef}
          placeholder="Search for Resources near..."
          variant="filled"
        />
      )}
    />
  );
};

export default SearchBar;
