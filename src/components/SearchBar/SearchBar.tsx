import TextField from '@mui/material/TextField';
import { Autocomplete, InputAdornment } from '@mui/material';
import { SearchIcon } from 'icons';
import styles from './SearchBar.module.scss';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import { toLatLngLiteral, useMap } from '@vis.gl/react-google-maps';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import { useLayoutEffect, useRef } from 'react';

type SearchBarProps = {
  open?: boolean;
};

const SearchBar = ({ open = false }: SearchBarProps) => {
  const { onChangeActiveSearchLocation } = useActiveSearchLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const map = useMap();
  const { isFetching, onDebouncedChange, suggestions } =
    useGooglePlacesAutocomplete();

  const onSelect = async (place: google.maps.places.Place) => {
    if (!place.id) {
      return;
    }
    const results = await place.fetchFields({ fields: ['location'] });

    if (!results.place.location) {
      return;
    }

    if (!map) {
      return;
    }

    const location = toLatLngLiteral(results.place.location);

    onChangeActiveSearchLocation(location);
    map.panTo(location);
    map.setZoom(16);
  };

  useLayoutEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth={false}
      onInputChange={(_event, value) => {
        onDebouncedChange(value);
      }}
      options={suggestions}
      loading={isFetching}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.text.text}
      onChange={(_event, value, reason) => {
        if (reason === 'clear') {
          return onChangeActiveSearchLocation(null);
        }

        if (reason !== 'selectOption') {
          return;
        }

        if (!value) {
          return;
        }

        onSelect(value.toPlace());
      }}
      slotProps={{
        popupIndicator: { sx: { marginRight: '16px' } }
      }}
      classes={{ root: styles.root || '' }}
      renderInput={({ InputProps, disabled, fullWidth, id, inputProps }) => (
        <TextField
          id={id}
          autoComplete="off"
          fullWidth={fullWidth}
          disabled={disabled}
          inputMode="search"
          size="small"
          placeholder="Search for Resources near..."
          variant="standard"
          slotProps={{
            root: {
              sx: {
                background: '#ffffff',
                borderRadius: 4,
                paddingBlock: '16px',
                paddingInline: 0
              }
            },
            input: {
              ...InputProps,
              inputRef,
              autoComplete: 'off',
              sx: {
                borderRadius: 4,
                paddingLeft: '16px',
                paddingRight: '60px !important'
              },
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
            },

            htmlInput: { ...inputProps }
          }}
        />
      )}
    />
  );
};

export default SearchBar;
