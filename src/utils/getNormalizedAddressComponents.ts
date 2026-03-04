type DesiredAddressComponentType =
  | 'route'
  | 'administrative_area_level_1'
  | 'locality'
  | 'postal_code';

type DesiredComponentName = 'street' | 'state' | 'city' | 'zip_code';

const addressComponentToFieldName = {
  route: 'street',
  administrative_area_level_1: 'state',
  locality: 'city',
  postal_code: 'zip_code'
} as const satisfies Record<DesiredAddressComponentType, DesiredComponentName>;

const getNormalizedAddressComponents = (
  addressComponents: google.maps.places.AddressComponent[] = []
) => {
  return addressComponents.reduce<Record<DesiredComponentName, string>>(
    (prev, component) => {
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
    },
    { street: '', state: '', city: '', zip_code: '' }
  );
};

export default getNormalizedAddressComponents;
