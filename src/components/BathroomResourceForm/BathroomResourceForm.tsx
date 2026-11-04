import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceForm from 'components/ResourceForm/ResourceForm';
import bathroomResourceSchema, {
  type BathroomFormValues
} from 'schemas/bathroomResourceSchema';
import { tagOptions } from './choiceFieldOptions';
import dropNullEntries from 'utils/dropNullEntries';
import type { ResourceEntry } from 'types/ResourceEntry';

type BathroomResourceFormProps = {
  defaultValues?: ResourceEntry | null;
  onSubmit: (values: FormValues) => void;
  onGoBack?: VoidFunction;
  isSubmitting?: boolean;
};

type FormValues = BathroomFormValues;

const COLOR = '#7C7C7C';
const SCHEMA = bathroomResourceSchema;

const BathroomResourceForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
  onGoBack
}: BathroomResourceFormProps) => {
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
  const TITLE = `${isUpdating ? 'Update' : 'Add'} a Bathroom Resource`;

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
                name="bathroom.tags"
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

export default BathroomResourceForm;
