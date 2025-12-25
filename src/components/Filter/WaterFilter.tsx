import { Stack } from '@mui/material';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import FilterActions from './FilterActions';
import { FormProvider, useForm } from 'react-hook-form';
import MultipleChoiceFilter from './MultipleChoiceFilter';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { useSearchParams } from 'react-router';
import SingleChoiceFilter from './SingleChoiceFilter';
import { DevTool } from '@hookform/devtools';
import type {
  ResourceEntryType,
  WaterDispenserType,
  WaterTag
} from 'types/ResourceEntry';

const dispenserTypes = [
  'BOTTLE_FILLER',
  'DRINKING_FOUNTAIN',
  'JUG',
  'SINK',
  'SODA_MACHINE',
  'VESSEL',
  'WATER_COOLER'
] satisfies WaterDispenserType[];

const features = [
  'BYOB',
  'FILTERED',
  'ID_REQUIRED',
  'WHEELCHAIR_ACCESSIBLE'
] satisfies WaterTag[];

const entryTypes = [
  'OPEN',
  'RESTRICTED',
  'UNSURE'
] satisfies ResourceEntryType[];

type WaterFilterFormValues = {
  dispenser_type: string[];
  features: string[];
  entry_type: string;
};

const initialValues = {
  dispenser_type: [],
  features: [],
  entry_type: ''
} satisfies WaterFilterFormValues;

const WaterFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {
    dispenser_type: searchParams.getAll('water.dispenser_type'),
    features: searchParams.getAll('water.tags'),
    entry_type: searchParams.get('entry_type') || ''
  } satisfies WaterFilterFormValues;

  const methods = useForm({
    defaultValues
  });
  const { setToolbarModal } = useToolbarContext();
  const { control, reset, handleSubmit } = methods;

  const onSubmit = (values: WaterFilterFormValues) => {
    setSearchParams(prev => {
      const { dispenser_type, features, entry_type } = values;
      prev.delete('water.dispenser_type');
      dispenser_type.forEach(value => {
        prev.append('water.dispenser_type', value);
      });

      prev.delete('water.tags');
      features.forEach(feature => {
        prev.append('water.tags', feature);
      });

      if (!entry_type) {
        prev.delete('entry_type');
      } else {
        prev.set('entry_type', entry_type);
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
        <FilterHeader>Water Filter</FilterHeader>

        <FilterContent>
          <Stack gap="25px">
            <MultipleChoiceFilter<WaterFilterFormValues>
              label="Dispenser Type"
              name="dispenser_type"
              items={dispenserTypes}
            />
            <MultipleChoiceFilter<WaterFilterFormValues>
              label="Features"
              items={features}
              name="features"
            />
            <SingleChoiceFilter
              name="entry_type"
              label="Entry Type"
              items={entryTypes}
            />
          </Stack>
          <FilterActions />
        </FilterContent>
      </form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default WaterFilter;
