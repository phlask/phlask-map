import { Stack, Divider } from '@mui/material';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import FormSelectField from 'components/forms/FormSelectField/FormSelectField';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import { FormProvider, useForm } from 'react-hook-form';
import type { FoodFormValues } from 'schemas/foodResourceSchema';
import ResourceForm from 'components/ResourceForm/ResourceForm';
import {
  organizationTypeOptions,
  tags,
  foodTypeOptions,
  foodDistributionTypeOptions
} from './choiceFieldOptions';
import { useToolbarContext } from 'contexts/ToolbarContext';
import type { ResourceEntry } from 'types/ResourceEntry';
import foodResourceSchema from 'schemas/foodResourceSchema';
import dropNullEntries from 'utils/dropNullEntries';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = FoodFormValues;

type FoodResourceFormProps = {
  defaultValues?: ResourceEntry | null;
  onSubmit: (values: FormValues) => void;
  onGoBack?: VoidFunction;
  isSubmitting?: boolean;
};

const COLOR = '#FF9A55';
const SCHEMA = foodResourceSchema;

const FoodResourceForm = ({
  defaultValues = null,
  isSubmitting = false,
  onGoBack,
  onSubmit
}: FoodResourceFormProps) => {
  const { setToolbarModal } = useToolbarContext();
  const onClose = () => {
    if (onGoBack) {
      onGoBack();
    }

    setToolbarModal(null);
  };

  const methods = useForm({
    defaultValues: SCHEMA.parse(
      defaultValues ? dropNullEntries(defaultValues) : {}
    ),
    resolver: zodResolver(SCHEMA)
  });

  const isUpdating = Boolean(defaultValues);
  const TITLE = `${isUpdating ? 'Update' : 'Add'} a Food Resource`;

  return (
    <FormProvider {...methods}>
      <ResourceForm<FoodFormValues>
        title={TITLE}
        color={COLOR}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onClose={onClose}
        onGoBack={onGoBack}
        renderPageOne={({ imageElement, shouldShowImageElement }) => (
          <>
            {shouldShowImageElement && imageElement}
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormTextField<FormValues>
                name="name"
                label="Name"
                helperText="Enter a name for the resource. (Example: City Hall)"
                required
                fullWidth
              />
              <FormResourceAddressField label="Street Address" fullWidth />
            </Stack>
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormTextField<FormValues>
                name="food.organization_name"
                label="Organization Name"
                fullWidth
              />
              <FormSelectField<FormValues>
                name="food.organization_type"
                label="Organization Type"
                data-cy="select-organization-type"
                options={organizationTypeOptions}
                fullWidth
              />
            </Stack>
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormTextField<FormValues>
                name="food.organization_url"
                label="Organization Website"
                fullWidth
              />
            </Stack>
          </>
        )}
        renderPageTwo={({ imageElement, shouldShowImageElement }) => (
          <>
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={3}
              justifyContent={{ sx: 'flex-start', md: 'space-evenly' }}
            >
              {shouldShowImageElement && imageElement}
              <FormCheckboxListField<FormValues>
                name="food.tags"
                label="Helpful info"
                options={tags}
                labelPlacement="start"
              />
            </Stack>
            <Divider />
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormTextField<FormValues>
                name="description"
                label="Description"
                fullWidth
              />
              <ResourceEntryTypeField />
            </Stack>
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormMultipleChoiceField<FormValues>
                name="food.food_type"
                label="Food Type"
                options={foodTypeOptions}
                fullWidth
              />
              <FormMultipleChoiceField<FormValues>
                name="food.distribution_type"
                label="Distribution Type"
                options={foodDistributionTypeOptions}
                fullWidth
              />
            </Stack>
            <FormTextField<FormValues>
              name="guidelines"
              label="Guidelines"
              helperText="Share tips on respectful PHLASKing at this location."
              fullWidth
              multiline
              minRows={2}
            />
          </>
        )}
      />
    </FormProvider>
  );
};

export default FoodResourceForm;
