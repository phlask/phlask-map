import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormMultipleChoiceField from 'components/forms/FormMultipleChoiceField/FormMultipleChoiceField';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { useForm, FormProvider } from 'react-hook-form';
import dropNullEntries from 'utils/dropNullEntries';
import ResourceForm from 'components/ResourceForm/ResourceForm';
import { forageTypeOptions, tagOptions } from './choiceFieldOptions';
import foragingResourceSchema from 'schemas/foragingResourceSchema';
import type { ResourceEntry } from 'types/ResourceEntry';
import type { ForagingFormValues } from 'schemas/foragingResourceSchema';

type FormValues = ForagingFormValues;

type ForageResourceFormProps = {
  defaultValues?: ResourceEntry | null;
  onSubmit: (values: FormValues) => void;
  onGoBack?: VoidFunction;
  isSubmitting?: boolean;
};

const COLOR = '#5DA694';
const SCHEMA = foragingResourceSchema;

const ForageResourceForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
  onGoBack
}: ForageResourceFormProps) => {
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
  const TITLE = `${isUpdating ? 'Update' : 'Add'} a Foraging Resource`;

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
                name="forage.forage_type"
                label="Forage Type"
                options={forageTypeOptions}
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
                name="forage.tags"
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

export default ForageResourceForm;
