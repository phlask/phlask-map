import filterParamSettings from 'constants/filterParamSettings';
import { useSearchParams } from 'react-router';
import type { FilterParam } from 'types/FilterParam';

const filterDatabaseAccessors = Object.entries(filterParamSettings).map(
  ([key, value]) => ({
    param: key,
    databaseAccessor: value.databaseAccessor,
    isMultipleChoice: value.isMultipleChoice
  }),
  {} as Record<FilterParam, string>
);

const useActiveFilters = () => {
  const [searchParams] = useSearchParams();
  return filterDatabaseAccessors.map(filter => ({
    name: filter.databaseAccessor,
    value: filter.isMultipleChoice
      ? searchParams.getAll(filter.param)
      : searchParams.get(filter.param) || ''
  }));
};

export default useActiveFilters;
