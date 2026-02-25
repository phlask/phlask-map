type WaterFilterParam = 'water.dispenser_type' | 'water.tags';
type FoodFilterParam =
  | 'food.food_type'
  | 'food.distribution_type'
  | 'food.organization_type';
type ForageFilterParam = 'forage.forage_type' | 'forage.tags';
type BathroomFilterParam = 'bathroom.tags';
type ResourceAgnosticFilterParam = 'entry_type';
type FilterParam =
  | WaterFilterParam
  | FoodFilterParam
  | ForageFilterParam
  | BathroomFilterParam
  | ResourceAgnosticFilterParam;

type FilterSettings = {
  label: string;
  databaseAccessor: string;
  isMultipleChoice: boolean;
  options: string[];
};

export type { FilterParam, FilterSettings };
