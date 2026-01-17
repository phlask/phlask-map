import filterNullish from 'utils/filterNullish';
import filterParamSettings from 'constants/filterParamSettings';
import { useSearchParams } from 'react-router';
import type { FilterParam } from 'types/FilterParam';

const filterDatabaseAccessors = Object.entries(filterParamSettings).map(
  ([key, value]) => ({
    param: key,
    databaseAccessor: value.databaseAccessor,
    isMultipleChoice: value.isMultipleChoice,
    options: value.options
  }),
  {} as Record<FilterParam, string>
);

const useActiveFilters = () => {
  const [searchParams] = useSearchParams();

  const activeFilters = filterNullish(
    filterDatabaseAccessors.map(filter => {
      const validValues = searchParams
        .getAll(filter.param)
        .filter(value => filter.options.includes(value));

      if (!validValues.length) {
        return null;
      }

      const value = filter.isMultipleChoice
        ? validValues
        : validValues.at(0) || '';

      return {
        name: filter.databaseAccessor,
        value
      };
    })
  );

  return { activeFilters, hasActiveFilters: Boolean(activeFilters.length) };
};

export default useActiveFilters;
