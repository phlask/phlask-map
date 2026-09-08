import filterParamSettings from 'constants/filterParamSettings';
import { useSearchParams } from 'react-router';
import type { FilterParam, FilterSettings } from 'types/FilterParam';

type GetFilterValuesFn = () => string[];

type SetFilterValuesFn = (
  data: string | string[],
  params?: URLSearchParams
) => void;

export type Filter = Omit<FilterSettings, 'isMultipleChoice'> & {
  getValues: GetFilterValuesFn;
  setValues: SetFilterValuesFn;
};

const useFilter = <T extends FilterParam>(name: T): Filter => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { label, databaseAccessor, options } = filterParamSettings[name];

  const getValues = () => searchParams.getAll(name);

  const getUpdater = (prev: URLSearchParams) => (data: string | string[]) => {
    prev.delete(name);
    if (Array.isArray(data)) {
      data.forEach(value => {
        prev.append(name, value);
      });
      return prev;
    }

    if (data) {
      prev.set(name, data);
    }

    return prev;
  };

  const setValues: SetFilterValuesFn = (
    data: string | string[],
    params?: URLSearchParams
  ) => {
    if (params) {
      const update = getUpdater(params);
      return update(data);
    }

    setSearchParams(prev => {
      const update = getUpdater(prev);
      return update(data);
    });
  };

  return {
    label,
    databaseAccessor,
    options,
    getValues,
    setValues
  };
};

export default useFilter;
