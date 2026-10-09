import { Autocomplete, Box, TextField } from '@mui/material';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import useAddressFormControllers from 'hooks/useAddressFormControllers';
import UseMyLocationButton from 'components/UseMyLocationButton/UseMyLocationButton';
import getNormalizedAddressComponents from 'utils/getNormalizedAddressComponents';

const LOCATION_NOT_FOUND_ERROR =
  "We couldn't find your location, please select an option from the search";

type FormResourceAddressFieldProps = {
  label?: string;
  fullWidth?: boolean;
};

const FormResourceAddressField = ({
  label = 'Address',
  fullWidth = false
}: FormResourceAddressFieldProps) => {
  const { suggestions, isFetching, onDebouncedChange } =
    useGooglePlacesAutocomplete();
  const {
    inputRef,
    addressValue,
    error,
    onClear,
    setAddressError,
    setAddressValues
  } = useAddressFormControllers();

  const onSelect = async (place: google.maps.places.Place) => {
    const googlePlacesId = place.id;
    if (!googlePlacesId) {
      return setAddressError('Please select a valid address');
    }

    const results = await place.fetchFields({
      fields: ['location', 'addressComponents', 'formattedAddress']
    });

    if (!results.place.location) {
      return setAddressError('Please select a valid address');
    }

    const { lat: latitude, lng: longitude } = toLatLngLiteral(
      results.place.location
    );

    if (!results.place.addressComponents) {
      return setAddressError('Please select a valid address');
    }

    const addressComponents = getNormalizedAddressComponents(
      results.place.addressComponents
    );

    setAddressValues({
      address: place.formattedAddress || '',
      gp_id: googlePlacesId,
      city: addressComponents.city || '',
      state: addressComponents.state || '',
      latitude,
      longitude,
      zip_code: addressComponents.zip_code
    });
  };

  const onGetMyLocationSuccess = async (
    userLocation: google.maps.LatLngLiteral
  ) => {
    const circle = new google.maps.Circle({
      center: userLocation,
      radius: 30
    });

    const { places } = await google.maps.places.Place.searchNearby({
      locationRestriction: circle,
      fields: ['id', 'formattedAddress']
    });

    const firstPlace = places.at(0);
    if (!firstPlace?.formattedAddress) {
      return setAddressError(LOCATION_NOT_FOUND_ERROR);
    }

    await onSelect(firstPlace);
  };

  return (
    <Autocomplete<google.maps.places.PlacePrediction | string>
      openOnFocus
      options={suggestions}
      fullWidth={fullWidth}
      value={addressValue || null}
      onInputChange={(_event, value, reason) => {
        if (reason !== 'input') {
          return;
        }
        onDebouncedChange(value);
      }}
      loading={isFetching}
      getOptionKey={option =>
        typeof option === 'string' ? option : option.placeId
      }
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.text.text
      }
      onChange={(_event, value, reason) => {
        if (reason === 'clear') {
          return onClear();
        }

        if (reason !== 'selectOption') {
          return;
        }

        if (!value || typeof value === 'string') {
          return;
        }

        onSelect(value.toPlace());
      }}
      renderInput={({ inputProps, ...params }) => (
        <TextField
          {...params}
          label={`${label}`}
          slotProps={{
            inputLabel: { required: true },

            htmlInput: {
              ...inputProps,
              'data-cy': 'form-resource-address-input'
            }
          }}
          inputRef={inputRef}
          error={Boolean(error)}
          helperText={
            <>
              {error?.message && (
                <Box component="span" sx={{ display: 'block' }}>
                  {error.message}
                </Box>
              )}
              {error?.message !== LOCATION_NOT_FOUND_ERROR && (
                <UseMyLocationButton
                  onError={setAddressError}
                  onSuccess={onGetMyLocationSuccess}
                />
              )}
            </>
          }
        />
      )}
    />
  );
};

export default FormResourceAddressField;
