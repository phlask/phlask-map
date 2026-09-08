import type { FormMultipleChoiceFieldOption } from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';

export const tagOptions = [
  {
    key: 'WHEELCHAIR_ACCESSIBLE',
    label: 'Wheelchair accessible',
    value: 'WHEELCHAIR_ACCESSIBLE'
  },
  {
    key: 'GENDER_NEUTRAL',
    label: 'Gender neutral',
    value: 'GENDER_NEUTRAL'
  },
  {
    key: 'CHANGING_TABLE',
    label: 'Changing table',
    value: 'CHANGING_TABLE'
  },
  {
    key: 'SINGLE_OCCUPANCY',
    label: 'Single occupancy',
    value: 'SINGLE_OCCUPANCY'
  },
  {
    key: 'FAMILY',
    label: 'Family bathroom',
    value: 'FAMILY'
  },
  {
    key: 'HAS_FOUNTAIN',
    label: 'Also has water fountain',
    value: 'HAS_FOUNTAIN'
  }
] satisfies FormMultipleChoiceFieldOption[];
