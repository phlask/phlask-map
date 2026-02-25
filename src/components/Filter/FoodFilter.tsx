import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import { FormProvider } from 'react-hook-form';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import SingleChoiceFilter from './SingleChoiceFilter';
import useFilter from 'hooks/useFilter';
import type { FilterFormFilter } from 'hooks/useFilterForm';
import useFilterForm from 'hooks/useFilterForm';

type FoodFilterFormValues = {
  food_type: string[];
  distribution_type: string[];
  organization_type: string;
};

const initialValues = {
  food_type: [],
  distribution_type: [],
  organization_type: ''
} satisfies FoodFilterFormValues;

const FoodFilter = () => {
  const foodTypeFilter = useFilter('food.food_type');
  const distributionTypeFilter = useFilter('food.distribution_type');
  const organizationTypeFilter = useFilter('food.organization_type');

  const filters = [
    { path: 'food_type', filter: foodTypeFilter },
    { path: 'distribution_type', filter: distributionTypeFilter },
    { path: 'organization_type', filter: organizationTypeFilter }
  ] satisfies FilterFormFilter<FoodFilterFormValues>[];

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
        <FilterHeader>Food Filter</FilterHeader>

        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<FoodFilterFormValues>
              name="food_type"
              label={foodTypeFilter.label}
              items={foodTypeFilter.options}
            />
            <MultipleChoiceFilter<FoodFilterFormValues>
              name="distribution_type"
              label={distributionTypeFilter.label}
              items={distributionTypeFilter.options}
            />
            <SingleChoiceFilter<FoodFilterFormValues>
              name="organization_type"
              label={organizationTypeFilter.label}
              items={organizationTypeFilter.options}
            />
          </Stack>
          <FilterActions />
        </FilterContent>
      </form>
    </FormProvider>
  );
};

export default FoodFilter;
