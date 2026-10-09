import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceForm from 'components/ResourceForm/ResourceForm';
import waterResourceSchema, {
  type WaterFormValues
} from 'schemas/waterResourceSchema';
import { tagOptions, waterDispenserTypeOptions } from './choiceFieldOptions';
import type { ResourceEntry } from 'types/ResourceEntry';
import dropNullEntries from 'utils/dropNullEntries';

export type FormValues = WaterFormValues;

type WaterResourceFormProps = {
  defaultValues?: ResourceEntry | null;
  onSubmit: (values: FormValues) => void;
  onGoBack?: VoidFunction;
  onClose?: VoidFunction;
  isSubmitting?: boolean;
};

const COLOR = '#5286E9';
const SCHEMA = waterResourceSchema;

const WaterResourceForm = ({
  defaultValues = null,
  isSubmitting = false,
  onGoBack,
  onClose: onCloseProp,
  onSubmit
}: WaterResourceFormProps) => {
  const { setToolbarModal } = useToolbarContext();
  const onClose = () => {
    if (onGoBack) {
      onGoBack();
    }
    onCloseProp?.();

    setToolbarModal(null);
  };

  const methods = useForm({
    defaultValues: SCHEMA.parse(
      defaultValues ? dropNullEntries(defaultValues) : {}
    ),
    resolver: zodResolver(SCHEMA)
  });

  const isUpdating = Boolean(defaultValues);
  const TITLE = `${isUpdating ? 'Update' : 'Add'} a Water Resource`;

  return (
    <FormProvider {...methods}>
      <ResourceForm<FormValues>
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
              <FormCheckboxListField<FormValues>
                name="water.tags"
                label="Helpful info"
                options={tagOptions}
                labelPlacement="start"
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

export default WaterResourceForm;
