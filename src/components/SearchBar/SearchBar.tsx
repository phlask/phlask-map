import TextField from '@mui/material/TextField';
import { Autocomplete, InputAdornment } from '@mui/material';
import { SearchIcon } from 'icons';
import styles from './SearchBar.module.scss';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import { toLatLngLiteral, useMap } from '@vis.gl/react-google-maps';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import { useLayoutEffect, useMemo, useRef } from 'react';
import useGetGooglePlaceById from 'hooks/queries/useGetGooglePlaceById';
import getNormalizedAddressComponents from 'utils/getNormalizedAddressComponents';

type SearchBarProps = {
  open?: boolean;
};

const SearchBar = ({ open = false }: SearchBarProps) => {
  const { onChangeActiveSearchLocation } = useActiveSearchLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const map = useMap();
  const { isFetching, onDebouncedChange, suggestions } =
    useGooglePlacesAutocomplete();

  const { data: activePlace = null } = useGetGooglePlaceById();

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

    onChangeActiveSearchLocation({
      lat: location.lat,
      lng: location.lng,
      placeId: results.place.id
    });
    map.panTo(location);
    map.setZoom(16);
  };

  useLayoutEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const getOptionLabel = (option: google.maps.places.Place) => {
    const { addressComponents, displayName } = option;
    const { street, city, state, zip_code } =
      getNormalizedAddressComponents(addressComponents);

    return `${displayName}, ${street}, ${city}, ${state} ${zip_code}`;
  };

  const options = useMemo(() => {
    if (!suggestions && activePlace) {
      return [activePlace];
    }

    return suggestions;
  }, [activePlace, suggestions]);

  return (
    <Autocomplete
      fullWidth={false}
      onInputChange={(_event, value) => {
        onDebouncedChange(value);
      }}
      options={options}
      defaultValue={activePlace}
      loading={isFetching}
      getOptionKey={option => option.id}
      getOptionLabel={getOptionLabel}
      value={activePlace}
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

        onSelect(value);
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
