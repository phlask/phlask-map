import type { FormMultipleChoiceFieldOption } from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';

export const forageTypeOptions = [
  {
    key: 'NUT',
    label: 'Nut',
    value: 'NUT'
  },
  {
    key: 'FRUIT',
    label: 'Fruit',
    value: 'FRUIT'
  },
  {
    key: 'LEAVES',
    label: 'Leaves',
    value: 'LEAVES'
  },
  {
    key: 'BARK',
    label: 'Bark',
    value: 'BARK'
  },
  {
    key: 'FLOWERS',
    label: 'Flowers',
    value: 'FLOWERS'
  }
] satisfies FormMultipleChoiceFieldOption[];

export const tagOptions = [
  {
    key: 'MEDICINAL',
    label: 'Medicinal',
    value: 'MEDICINAL'
  },
  {
    key: 'IN_SEASON',
    label: 'In Season',
    value: 'IN_SEASON'
  },
  {
    key: 'COMMUNITY_GARDEN',
    label: 'Community Garden',
    value: 'COMMUNITY_GARDEN'
  }
] satisfies FormMultipleChoiceFieldOption[];
