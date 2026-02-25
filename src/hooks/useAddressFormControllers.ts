import { useController, useFormContext } from 'react-hook-form';

type ResourceAddressField =
  | 'address'
  | 'city'
  | 'state'
  | 'gp_id'
  | 'latitude'
  | 'longitude'
  | 'zip_code';

const useAddressFormControllers = () => {
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

  return {
    inputRef: addressController.field.ref,
    error: addressController.fieldState.error,
    setAddressValues,
    setAddressError,
    onClear
  };
};

export default useAddressFormControllers;
