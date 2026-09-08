import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import useFilter from 'hooks/useFilter';
import { FormProvider } from 'react-hook-form';
import type { FilterFormFilter } from 'hooks/useFilterForm';
import useFilterForm from 'hooks/useFilterForm';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import SingleChoiceFilter from './SingleChoiceFilter';

type ForagingFilterFormValues = {
  forage_type: string[];
  tags: string[];
  entry_type: string;
};

const initialValues = {
  forage_type: [],
  tags: [],
  entry_type: ''
} satisfies ForagingFilterFormValues;

const ForagingFilter = () => {
  const forageTypeFilter = useFilter('forage.forage_type');
  const forageTagsFilter = useFilter('forage.tags');
  const entryTypeFilter = useFilter('entry_type');

  const filters = [
    { path: 'forage_type', filter: forageTypeFilter },
    { path: 'tags', filter: forageTagsFilter },
    { path: 'entry_type', filter: entryTypeFilter }
  ] satisfies FilterFormFilter<ForagingFilterFormValues>[];

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
        <FilterHeader>Foraging Filter</FilterHeader>
        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<ForagingFilterFormValues>
              name="forage_type"
              label={forageTypeFilter.label}
              items={forageTypeFilter.options}
            />
            <MultipleChoiceFilter<ForagingFilterFormValues>
              name="tags"
              label={forageTagsFilter.label}
              items={forageTagsFilter.options}
            />
            <SingleChoiceFilter<ForagingFilterFormValues>
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

export default ForagingFilter;
