import type { FormMultipleChoiceFieldOption } from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';

export const foodTypeOptions = [
  {
    key: 'PERISHABLE',
    label: 'Perishable (Fruit, vegetables, dairy, etc.)',
    value: 'PERISHABLE'
  },
  {
    key: 'NON_PERISHABLE',
    label: 'Non-perishable (Canned, boxed, pantry items, etc.)',
    value: 'NON_PERISHABLE'
  },
  {
    key: 'PREPARED',
    label: 'Prepared food and meals',
    value: 'PREPARED'
  }
] satisfies FormMultipleChoiceFieldOption[];

export const foodDistributionTypeOptions = [
  {
    key: 'EAT_ON_SITE',
    label: 'Eat on site',
    value: 'EAT_ON_SITE'
  },
  {
    key: 'DELIVERY',
    label: 'Delivery',
    value: 'DELIVERY'
  },
  {
    key: 'PICKUP',
    label: 'Pickup',
    value: 'PICKUP'
  }
] satisfies FormMultipleChoiceFieldOption[];

export const organizationTypeOptions = [
  {
    key: 'GOVERNMENT',
    label: 'Government',
    value: 'GOVERNMENT'
  },
  {
    key: 'BUSINESS',
    label: 'Business',
    value: 'BUSINESS'
  },
  {
    key: 'NON_PROFIT',
    label: 'Non-profit',
    value: 'NON_PROFIT'
  },
  {
    key: 'UNSURE',
    label: 'Unsure',
    value: 'UNSURE'
  }
] satisfies FormMultipleChoiceFieldOption[];

export const tags = [
  {
    key: 'WHEELCHAIR_ACCESSIBLE',
    label: 'Wheelchair accessible',
    value: 'WHEELCHAIR_ACCESSIBLE'
  },
  {
    key: 'ID_REQUIRED',
    label: 'ID Required',
    value: 'ID_REQUIRED'
  },
  {
    key: 'YOUTH_ONLY',
    label: 'Youth (under 18) only',
    value: 'YOUTH_ONLY'
  },
  {
    key: 'COMMUNITY_FRIDGE',
    label: 'Community fridges, etc.',
    value: 'COMMUNITY_FRIDGE'
  }
] satisfies FormMultipleChoiceFieldOption[];
