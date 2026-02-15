import TextField from '@mui/material/TextField';
import { Autocomplete, InputAdornment } from '@mui/material';
import { SearchIcon } from 'icons';
import styles from './SearchBar.module.scss';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import { toLatLngLiteral, useMap } from '@vis.gl/react-google-maps';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useGetGooglePlaceById from 'hooks/queries/useGetGooglePlaceById';

type SearchBarProps = {
  open?: boolean;
};

const SearchBar = ({ open = false }: SearchBarProps) => {
  const [value, setValue] = useState<
    google.maps.places.PlacePrediction | google.maps.places.Place | null
  >(null);
  const { onChangeActiveSearchLocation } = useActiveSearchLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const map = useMap();
  const { isFetching, onDebouncedChange, suggestions } =
    useGooglePlacesAutocomplete();

  const { data: activePlace = null } = useGetGooglePlaceById();

  const onSelect = async (
    place: google.maps.places.Place | google.maps.places.PlacePrediction
  ) => {
    const isPrediction = place instanceof google.maps.places.PlacePrediction;
    if (isPrediction) {
      setValue(place);
    }
    const selectedPlace = isPrediction ? place.toPlace() : place;

    if (!selectedPlace.id) {
      return;
    }
    const results = await selectedPlace.fetchFields({ fields: ['location'] });

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

  const controlledValue = useMemo(() => {
    if (!activePlace?.id) {
      return value;
    }

    if (!value) {
      return activePlace;
    }

    const isPrediction = value instanceof google.maps.places.PlacePrediction;

    if (isPrediction && value.placeId !== activePlace.id) {
      return activePlace;
    }

    return value;
  }, [activePlace, value]);

  const getOptionKey = useCallback(
    (option: google.maps.places.Place | google.maps.places.PlacePrediction) => {
      if (option instanceof google.maps.places.PlacePrediction) {
        return option.placeId;
      }
      return option.id;
    },
    []
  );

  const getOptionLabel = useCallback(
    (option: google.maps.places.Place | google.maps.places.PlacePrediction) => {
      if (option instanceof google.maps.places.PlacePrediction) {
        return option.text.text;
      }

      const { formattedAddress, displayName, types } = option;
      const isEstablishment = Boolean(types?.includes('establishment'));

      if (!isEstablishment && formattedAddress) {
        return formattedAddress;
      }

      return displayName || '';
    },
    []
  );

  const options = useMemo(() => {
    if (!suggestions.length && activePlace) {
      return [activePlace];
    }

    return suggestions;
  }, [activePlace, suggestions]);

  return (
    <Autocomplete
      fullWidth
      onInputChange={(_event, value, reason) => {
        if (reason !== 'input') {
          return;
        }

        onDebouncedChange(value);
      }}
      options={options}
      loading={isFetching}
      getOptionKey={getOptionKey}
      getOptionLabel={getOptionLabel}
      value={controlledValue}
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
