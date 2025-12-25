import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import type {
  FoodDistributionType,
  FoodOrganizationType,
  FoodType
} from 'types/ResourceEntry';
import { useSearchParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import SingleChoiceFilter from './SingleChoiceFilter';
import { useToolbarContext } from 'contexts/ToolbarContext';

const foodTypes = [
  'PERISHABLE',
  'NON_PERISHABLE',
  'PREPARED'
] satisfies FoodType[];

const distributionTypes = [
  'EAT_ON_SITE',
  'DELIVERY',
  'PICKUP'
] as FoodDistributionType[];

const organizationTypes = [
  'GOVERNMENT',
  'BUSINESS',
  'NON_PROFIT',
  'UNSURE'
] satisfies FoodOrganizationType[];

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
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {
    food_type: searchParams.getAll('food.food_type'),
    distribution_type: searchParams.getAll('food.distribution_type'),
    organization_type: searchParams.get('distribution_type') || ''
  } satisfies FoodFilterFormValues;

  const methods = useForm({
    defaultValues
  });
  const { setToolbarModal } = useToolbarContext();
  const { reset, handleSubmit } = methods;

  const onSubmit = (values: FoodFilterFormValues) => {
    setSearchParams(prev => {
      const { food_type, distribution_type, organization_type } = values;
      prev.delete('food.food_type');
      food_type.forEach(value => {
        prev.append('food.food_type', value);
      });

      prev.delete('food.distribution_type');
      distribution_type.forEach(feature => {
        prev.append('food.distribution_type', feature);
      });

      if (!organization_type) {
        prev.delete('food.organization_type');
      } else {
        prev.set('food.organization_type', organization_type);
      }

      return prev;
    });

    setToolbarModal(null);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset(initialValues)}
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <FilterHeader>Food Filter</FilterHeader>

        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<FoodFilterFormValues>
              label="Food Type"
              name="food_type"
              items={foodTypes}
            />
            <MultipleChoiceFilter<FoodFilterFormValues>
              label="Distribution Type"
              items={distributionTypes}
              name="distribution_type"
            />
            <SingleChoiceFilter<FoodFilterFormValues>
              name="organization_type"
              label="Organization Type Type"
              items={organizationTypes}
            />
          </Stack>
          <FilterActions />
        </FilterContent>
      </form>
    </FormProvider>
  );
};

export default FoodFilter;
