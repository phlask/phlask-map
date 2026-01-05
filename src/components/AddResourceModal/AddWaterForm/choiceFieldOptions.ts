import type { FormMultipleChoiceFieldOption } from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';

export const waterDispenserTypeOptions = [
  {
    key: 'DRINKING_FOUNTAIN',
    label: 'Drinking fountain',
    value: 'DRINKING_FOUNTAIN'
  },
  {
    key: 'BOTTLE_FILLER',
    label: 'Bottle filler and fountain',
    value: 'BOTTLE_FILLER'
  },
  {
    key: 'SINK',
    label: 'Sink',
    value: 'SINK'
  },
  {
    key: 'JUG',
    label: 'Water jug',
    value: 'JUG'
  },
  {
    key: 'SODA_MACHINE',
    label: 'Soda Machine',
    value: 'SODA_MACHINE'
  },
  {
    key: 'VESSEL',
    label: 'Pitcher',
    value: 'VESSEL'
  },
  {
    key: 'WATER_COOLER',
    label: 'Water Cooler',
    value: 'WATER_COOLER'
  }
] satisfies FormMultipleChoiceFieldOption[];

export const tagOptions = [
  {
    key: 'WHEELCHAIR_ACCESSIBLE',
    label: 'Wheelchair accessible',
    value: 'WHEELCHAIR_ACCESSIBLE'
  },
  {
    key: 'FILTERED',
    label: 'Filtered water',
    value: 'FILTERED'
  },
  {
    key: 'BYOB',
    label: 'Bring your own container',
    value: 'BYOB'
  },
  {
    key: 'ID_REQUIRED',
    label: 'ID required',
    value: 'ID_REQUIRED'
  }
] satisfies FormMultipleChoiceFieldOption[];
