import { FormProvider, useForm } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormImageUploadField from 'components/forms/FormImageUploadField/FormImageUploadField';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceForm from '../ResourceForm';
import type { WaterFormValues } from 'schemas/waterResourceSchema';
import waterResourceSchema from 'schemas/waterResourceSchema';
import { tagOptions, waterDispenserTypeOptions } from './choiceFieldOptions';

type AddWaterFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

const AddWaterForm = ({ onGoBack, onComplete }: AddWaterFormProps) => {
  const { setToolbarModal } = useToolbarContext();
  const { mutate: addResource, isPending } = useAddResourceMutation();

  const methods = useForm({
    defaultValues: waterResourceSchema.parse({}),
    resolver: zodResolver(waterResourceSchema)
  });

  const onClose = () => {
    onGoBack();
    setToolbarModal(null);
  };

  const onSubmit = (resource: WaterFormValues) => {
    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <FormProvider {...methods}>
      <ResourceForm<WaterFormValues>
        title="Add a water resource"
        onSubmit={onSubmit}
        isSubmitting={isPending}
        onClose={onClose}
        onGoBack={onGoBack}
        imageElement={
          <FormImageUploadField<WaterFormValues>
            name="images"
            renderContent={() => (
              <Button
                sx={{
                  color: 'white',
                  borderRadius: '8px',
                  background: '#5286E9',
                  textTransform: 'capitalize'
                }}
              >
                Choose Image
              </Button>
            )}
          />
        }
        renderPageOne={({ imageElement, shouldShowImageElement }) => (
          <>
            {shouldShowImageElement && imageElement}
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              gap={2}
              justifyContent={{ sx: 'flex-start', md: 'center' }}
            >
              <FormTextField<WaterFormValues>
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
              <FormTextField<WaterFormValues>
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
              <FormMultipleChoiceField<WaterFormValues>
                name="water.dispenser_type"
                label="Dispenser Type"
                options={waterDispenserTypeOptions}
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
              <FormCheckboxListField<WaterFormValues>
                name="water.tags"
                label="Helpful info"
                options={tagOptions}
                labelPlacement="start"
              />
            </Stack>
            <FormTextField<WaterFormValues>
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

export default AddWaterForm;
