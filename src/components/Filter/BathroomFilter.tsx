import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import useFilter from 'hooks/useFilter';
import type { FilterFormFilter } from 'hooks/useFilterForm';
import { FormProvider } from 'react-hook-form';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import SingleChoiceFilter from './SingleChoiceFilter';
import useFilterForm from 'hooks/useFilterForm';

type BathroomFilterFormValues = {
  tags: string[];
  entry_type: string;
};

const initialValues = {
  tags: [],
  entry_type: ''
} satisfies BathroomFilterFormValues;

const BathroomFilter = () => {
  const bathroomTagsFilter = useFilter('bathroom.tags');
  const entryTypeFilter = useFilter('entry_type');

  const filters = [
    { path: 'tags', filter: bathroomTagsFilter },
    { path: 'entry_type', filter: entryTypeFilter }
  ] satisfies FilterFormFilter<BathroomFilterFormValues>[];

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
        <FilterHeader>Bathroom Filter</FilterHeader>
        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<BathroomFilterFormValues>
              name="tags"
              label={bathroomTagsFilter.label}
              items={bathroomTagsFilter.options}
            />
            <SingleChoiceFilter<BathroomFilterFormValues>
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

export default BathroomFilter;
