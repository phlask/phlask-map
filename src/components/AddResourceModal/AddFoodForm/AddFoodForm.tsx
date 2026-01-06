import { FormProvider, useForm } from 'react-hook-form';
import { Divider, Stack } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceForm from '../ResourceForm';
import foodResourceSchema from 'schemas/foodResourceSchema';
import {
  foodDistributionTypeOptions,
  foodTypeOptions,
  organizationTypeOptions,
  tags
} from './choiceFieldOptions';
import type { FoodFormValues } from 'schemas/foodResourceSchema';
import FormSelectField from 'components/forms/FormSelectField/FormSelectField';

type AddFoodFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

type FormValues = FoodFormValues;

const TITLE = 'Add a Food Resource';
const COLOR = '#FF9A55';
const SCHEMA = foodResourceSchema;

const AddFoodForm = ({ onGoBack, onComplete }: AddFoodFormProps) => {
  const { setToolbarModal } = useToolbarContext();
  const { mutate: addResource, isPending } = useAddResourceMutation();

  const methods = useForm({
    defaultValues: SCHEMA.parse({}),
    resolver: zodResolver(SCHEMA)
  });

  const onClose = () => {
    onGoBack();
    setToolbarModal(null);
  };

  const onSubmit = (resource: FoodFormValues) => {
    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <FormProvider {...methods}>
      <ResourceForm<FoodFormValues>
        debug
        title={TITLE}
        color={COLOR}
        onSubmit={onSubmit}
        isSubmitting={isPending}
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

export default AddFoodForm;
