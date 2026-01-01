import { Autocomplete, TextField } from '@mui/material';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import useAddressFormControllers from 'hooks/useAddressFormControllers';
import UseMyLocationButton from 'components/UseMyLocationButton/UseMyLocationButton';

type FormResourceAddressFieldProps = {
  label?: string;
  fullWidth?: boolean;
};

type DesiredAddressComponentType =
  | 'administrative_area_level_1'
  | 'locality'
  | 'postal_code';

const addressComponentToFieldName = {
  administrative_area_level_1: 'state',
  locality: 'city',
  postal_code: 'zip_code'
} as const satisfies Record<DesiredAddressComponentType, string>;

const FormResourceAddressField = ({
  label = 'Address',
  fullWidth = false
}: FormResourceAddressFieldProps) => {
  const { suggestions, isFetching, onChange, onDebouncedChange } =
    useGooglePlacesAutocomplete();
  const { inputRef, error, onClear, setAddressError, setAddressValues } =
    useAddressFormControllers();

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

    const addressComponents = results.place.addressComponents.reduce<
      Record<string, string>
    >((prev, component) => {
      const type = component.types.find(
        (type): type is DesiredAddressComponentType =>
          type in addressComponentToFieldName
      );
      if (!type) {
        return prev;
      }

      const key = addressComponentToFieldName[type];
      let value = component.longText;
      if (key === 'state') {
        value = component.shortText;
      }

      return {
        ...prev,
        [key]: value || ''
      };
    }, {});

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

  return (
    <Autocomplete
      openOnFocus
      options={suggestions}
      fullWidth={fullWidth}
      onInputChange={(_event, value) => {
        onDebouncedChange(value);
      }}
      loading={isFetching}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.text.text}
      onChange={(_event, value, reason) => {
        if (reason === 'clear') {
          return onClear();
        }

        if (reason !== 'selectOption') {
          return;
        }

        if (!value) {
          return;
        }

        onSelect(value.toPlace());
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={`${label}*`}
          inputRef={inputRef}
          error={Boolean(error)}
          helperText={
            error?.message || (
              <UseMyLocationButton
                onError={setAddressError}
                onChange={onChange}
              />
            )
          }
        />
      )}
    />
  );
};

export default FormResourceAddressField;
