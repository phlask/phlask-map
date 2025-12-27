import type { FilterParam, FilterSettings } from 'types/FilterParam';
import type {
  BathroomTag,
  FoodDistributionType,
  FoodOrganizationType,
  FoodType,
  ForageTag,
  ForageType,
  ResourceEntryType,
  WaterDispenserType,
  WaterTag
} from 'types/ResourceEntry';

const filterParamSettings: Record<FilterParam, FilterSettings> = {
  'water.dispenser_type': {
    label: 'Dispenser Type',
    databaseAccessor: 'water->>dispenser_type',
    isMultipleChoice: true,
    options: [
      'BOTTLE_FILLER',
      'DRINKING_FOUNTAIN',
      'JUG',
      'SINK',
      'SODA_MACHINE',
      'VESSEL',
      'WATER_COOLER'
    ] satisfies WaterDispenserType[]
  },
  'water.tags': {
    label: 'Features',
    databaseAccessor: 'water->>tags',
    isMultipleChoice: true,
    options: [
      'BYOB',
      'FILTERED',
      'ID_REQUIRED',
      'WHEELCHAIR_ACCESSIBLE'
    ] satisfies WaterTag[]
  },
  'food.food_type': {
    label: 'Food Type',
    databaseAccessor: 'food->>food_type',
    isMultipleChoice: true,
    options: ['PERISHABLE', 'NON_PERISHABLE', 'PREPARED'] satisfies FoodType[]
  },
  'food.distribution_type': {
    label: 'Distribution Type',
    databaseAccessor: 'food->>distribution_type',
    isMultipleChoice: true,
    options: ['EAT_ON_SITE', 'DELIVERY', 'PICKUP'] as FoodDistributionType[]
  },
  'food.organization_type': {
    label: 'Organization Type',
    databaseAccessor: 'food->>organization_type',
    isMultipleChoice: false,
    options: [
      'GOVERNMENT',
      'BUSINESS',
      'NON_PROFIT',
      'UNSURE'
    ] satisfies FoodOrganizationType[]
  },
  'forage.forage_type': {
    label: 'Forage Type',
    databaseAccessor: 'forage->>forage_type',
    isMultipleChoice: true,
    options: [
      'NUT',
      'FRUIT',
      'LEAVES',
      'BARK',
      'FLOWERS'
    ] satisfies ForageType[]
  },
  'forage.tags': {
    label: 'Features',
    databaseAccessor: 'forage->>tags',
    isMultipleChoice: true,
    options: [
      'MEDICINAL',
      'IN_SEASON',
      'COMMUNITY_GARDEN'
    ] satisfies ForageTag[]
  },
  'bathroom.tags': {
    label: 'Features',
    databaseAccessor: 'bathroom->>tags',
    isMultipleChoice: true,
    options: [
      'WHEELCHAIR_ACCESSIBLE',
      'GENDER_NEUTRAL',
      'CHANGING_TABLE',
      'SINGLE_OCCUPANCY',
      'HAS_FOUNTAIN',
      'FAMILY'
    ] satisfies BathroomTag[]
  },
  entry_type: {
    label: 'Entry Type',
    databaseAccessor: 'entry_type',
    isMultipleChoice: false,
    options: ['OPEN', 'RESTRICTED', 'UNSURE'] satisfies ResourceEntryType[]
  }
} as const;

export default filterParamSettings;
