import { Autocomplete, Button, TextField } from '@mui/material';
import { toLatLngLiteral } from '@vis.gl/react-google-maps';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';
import { useController, useFormContext } from 'react-hook-form';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';

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

type ResourceAddressField =
  | 'address'
  | 'city'
  | 'state'
  | 'gp_id'
  | 'latitude'
  | 'longitude'
  | 'zip_code';

const FormResourceAddressField = ({
  label = 'Address',
  fullWidth = false
}: FormResourceAddressFieldProps) => {
  const { data: userLocation, isSuccess: isUserSharingLocation } =
    useGetUserLocationQuery();
  const { suggestions, isFetching, onChange, onDebouncedChange } =
    useGooglePlacesAutocomplete();
  const { control, setError, resetField } = useFormContext();
  const addressController = useController({ name: 'address', control });
  const cityController = useController({ name: 'city', control });
  const stateController = useController({ name: 'state', control });
  const googlePlacesIdController = useController({ name: 'gp_id', control });
  const latitudeController = useController({ name: 'latitude', control });
  const longitudeController = useController({ name: 'longitude', control });
  const zipCodeController = useController({ name: 'zip_code', control });

  const controllers = [
    addressController,
    cityController,
    stateController,
    googlePlacesIdController,
    latitudeController,
    longitudeController,
    zipCodeController
  ];

  const setAddressError = (message: string) =>
    setError('address', { message }, { shouldFocus: true });

  const setAddressValues = (
    values: Record<ResourceAddressField, string | number>
  ) => {
    controllers.forEach(({ field }) => field.onChange(values[field.name]));
  };

  const onClear = () => {
    controllers.forEach(controller => resetField(controller.field.name));
  };

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

  const onUseMyLocationClick = async () => {
    if (!isUserSharingLocation) {
      setAddressError("You're not sharing your location");
    }
    const circle = new google.maps.Circle({
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      },
      radius: 50
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

    onChange(firstPlace.formattedAddress || '');
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
          inputRef={addressController.field.ref}
          error={Boolean(addressController.fieldState.error)}
          helperText={
            addressController.fieldState.error?.message ||
            (isUserSharingLocation ? (
              <Button
                startIcon={<MyLocationIcon />}
                sx={{ textTransform: 'capitalize' }}
                variant="text"
                type="button"
                onClick={onUseMyLocationClick}
              >
                Use my location instead
              </Button>
            ) : (
              'Turn on location services to use your location'
            ))
          }
        />
      )}
    />
  );
};

export default FormResourceAddressField;
