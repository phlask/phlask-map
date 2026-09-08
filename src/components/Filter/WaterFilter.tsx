import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import { FormProvider } from 'react-hook-form';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import SingleChoiceFilter from './SingleChoiceFilter';
import useFilter from 'hooks/useFilter';
import useFilterForm, { type FilterFormFilter } from 'hooks/useFilterForm';

type WaterFilterFormValues = {
  dispenser_type: string[];
  tags: string[];
  entry_type: string;
};

const initialValues = {
  dispenser_type: [],
  tags: [],
  entry_type: ''
} satisfies WaterFilterFormValues;

const WaterFilter = () => {
  const dispenserTypeFilter = useFilter('water.dispenser_type');
  const waterTagsFilter = useFilter('water.tags');
  const entryTypeFilter = useFilter('entry_type');

  const filters = [
    { path: 'dispenser_type', filter: dispenserTypeFilter },
    { path: 'tags', filter: waterTagsFilter },
    { path: 'entry_type', filter: entryTypeFilter }
  ] satisfies FilterFormFilter<WaterFilterFormValues>[];

  const { methods, onReset, onSubmit } = useFilterForm({
    initialValues,
    filters
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <FilterHeader>Water Filter</FilterHeader>

        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<WaterFilterFormValues>
              name="dispenser_type"
              label={dispenserTypeFilter.label}
              items={dispenserTypeFilter.options}
            />
            <MultipleChoiceFilter<WaterFilterFormValues>
              name="tags"
              label={waterTagsFilter.label}
              items={waterTagsFilter.options}
            />
            <SingleChoiceFilter<WaterFilterFormValues>
              name="entry_type"
              label={entryTypeFilter.label}
              items={entryTypeFilter.options}
            />
          </Stack>
          <FilterActions />
        </FilterContent>
      </form>
    </FormProvider>
  );
};

export default WaterFilter;
