import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import useAddressFormControllers from 'hooks/useAddressFormControllers';
import UseMyLocationButton from 'components/UseMyLocationButton/UseMyLocationButton';
import getNormalizedAddressComponents from 'utils/getNormalizedAddressComponents';

type FormResourceAddressFieldProps = {
  label?: string;
  fullWidth?: boolean;
};

const FormResourceAddressField = ({
  label = 'Address',
  fullWidth = false
}: FormResourceAddressFieldProps) => {
  const { suggestions, isFetching, onChange, onDebouncedChange } =
    useGooglePlacesAutocomplete();
  const { inputRef, error, onClear, setAddressError, setAddressValues } =
    useAddressFormControllers();
  const formAddress: string = useWatch({ name: 'address' }) ?? '';
  const [localInput, setLocalInput] = useState<string | null>(null);
  const inputValue = localInput ?? formAddress;

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
      fields: ['formattedAddress']
    });

    const firstPlace = places.at(0);
    if (!firstPlace?.formattedAddress) {
      return setAddressError(
        "We couldn't find your location, please select an option from the search"
      );
    }

    onChange(firstPlace.formattedAddress);
  };

  return (
    <Autocomplete
      openOnFocus
      options={suggestions}
      fullWidth={fullWidth}
      inputValue={inputValue}
      onInputChange={(_event, value, reason) => {
        if (reason === 'reset') return;
        setLocalInput(value);
        if (reason === 'input') {
          onDebouncedChange(value);
        }
      }}
      loading={isFetching}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.text.text}
      onChange={(_event, value, reason) => {
        if (reason === 'clear') {
          setLocalInput('');
          return onClear();
        }

        if (reason !== 'selectOption' || !value) {
          return;
        }

        setLocalInput(value.text.text);
        onSelect(value.toPlace());
      }}
      renderInput={({ inputProps, ...params }) => (
        <TextField
          {...params}
          slotProps={{
            htmlInput: {
              ...inputProps,
              'data-cy': 'form-resource-address-input'
            },
            inputLabel: { required: true }
          }}
          label={`${label}`}
          inputRef={inputRef}
          error={Boolean(error)}
          helperText={
            error?.message || (
              <UseMyLocationButton
                onError={setAddressError}
                onSuccess={onGetMyLocationSuccess}
              />
            )
          }
        />
      )}
    />
  );
};

export default FormResourceAddressField;
