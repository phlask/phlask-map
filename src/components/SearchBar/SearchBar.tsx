import { useMemo, useRef, useState } from 'react';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import {
  setSearchBarMapTintOn,
  setTapInfoOpenedWhileSearchOpen
} from 'actions/actions';
import TextField from '@mui/material/TextField';
import { Autocomplete, debounce, InputAdornment } from '@mui/material';
import noop from 'utils/noop';
import { SearchIcon } from 'icons';
import useAppDispatch from 'hooks/useDispatch';
import useAppSelector from 'hooks/useSelector';
import styles from './SearchBar.module.scss';

type SearchBarProps = { search: (location: google.maps.LatLngLiteral) => void };

const SearchBar = ({ search }: SearchBarProps) => {
  const dispatch = useAppDispatch();

  const [suggestions, setSuggestions] = useState<
    google.maps.places.PlacePrediction[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const tapInfoOpenedWhileSearchOpen = useAppSelector(
    state => state.filterMarkers.tapInfoOpenedWhileSearchOpen
  );

  const onChange = useMemo(
    () =>
      debounce((input: string) => {
        google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input
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
          .catch(noop);
      }, 500),
    []
  );

  const handleSelect = async (place: google.maps.Place) => {
    if (!place.location) {
      return;
    }

    dispatch(setSearchBarMapTintOn(false));
    search(toLatLngLiteral(place.location));
  };

  return (
    <Autocomplete
      fullWidth={false}
      onInputChange={(_event, value, reason) => {
        if (reason !== 'input') {
          return;
        }
        if (!value.trim()) {
          return;
        }

        onChange(value);
      }}
      options={suggestions}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.mainText!.text ?? 'Name'}
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
          fullWidth={fullWidth}
          disabled={disabled}
          InputProps={{
            ...InputProps,
            classes: { adornedStart: styles['search-icon'] || '' },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon height={24} width={24} />
              </InputAdornment>
            ),
            disableUnderline: true
          }}
          {...{ inputProps }}
          size="small"
          inputRef={inputRef}
          placeholder="Search for Resources near..."
          variant="filled"
          onFocus={() => {
            if (!tapInfoOpenedWhileSearchOpen) {
              dispatch(setSearchBarMapTintOn(true));
            } else {
              dispatch(setTapInfoOpenedWhileSearchOpen(false));
              inputRef.current?.blur();
            }
          }}
          onBlur={() => {
            dispatch(setSearchBarMapTintOn(false));
          }}
        />
      )}
    />
  );
};

export default SearchBar;
