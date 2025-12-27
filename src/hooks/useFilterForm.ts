import { useToolbarContext } from 'contexts/ToolbarContext';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path
} from 'react-hook-form';
import type { Filter } from 'hooks/useFilter';
import { useSearchParams } from 'react-router';

export type FilterFormFilter<Values extends FieldValues> = {
  path: Path<Values>;
  filter: Filter;
};

type FilterFormConfig<Values extends FieldValues> = {
  initialValues: DefaultValues<Values>;
  filters: FilterFormFilter<Values>[];
};

const useFilterForm = <Values extends FieldValues>(
  config: FilterFormConfig<Values>
) => {
  const [_, setSearchParams] = useSearchParams();
  const { initialValues, filters } = config;

  const defaultValues = filters.reduce((prev, { path, filter }) => {
    const currentValue = filter.getValues();
    const isMultipleChoice = Array.isArray(prev[path]);
    if (isMultipleChoice) {
      return { ...prev, [path]: currentValue };
    }
    return { ...prev, [path]: currentValue.at(0) || '' };
  }, initialValues);

  const methods = useForm({
    defaultValues
  });

  const { reset, handleSubmit } = methods;

  const { setToolbarModal } = useToolbarContext();

  const submitHandler = handleSubmit(values => {
    setSearchParams(prev => {
      filters.forEach(({ path, filter }) => {
        filter.setValues(values[path], prev);
      });

      return prev;
    });

    setToolbarModal(null);
  });

  const onReset = () => reset(initialValues);

  return { methods, onSubmit: submitHandler, onReset };
};

export default useFilterForm;
