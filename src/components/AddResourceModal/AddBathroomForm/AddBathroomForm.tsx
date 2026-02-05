import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCheckboxListField from 'components/forms/FormCheckboxListField/FormCheckboxListField';
import FormResourceAddressField from 'components/forms/FormAddressField/FormResourceAddressField';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import ResourceEntryTypeField from 'components/forms/ResourceEntryTypeField/ResourceEntryTypeField';
import ResourceForm from 'components/AddResourceModal/ResourceForm';
import bathroomResourceSchema, {
  type BathroomFormValues
} from 'schemas/bathroomResourceSchema';
import { tagOptions } from './choiceFieldOptions';
import type { ResourceEntry } from 'types/ResourceEntry';
import { transformResourceForEdit } from 'utils/transformResourceForEdit';

type AddBathroomFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
  editingResource?: ResourceEntry | null;
};

type FormValues = BathroomFormValues;

const SCHEMA = bathroomResourceSchema;
const COLOR = '#7C7C7C';

const AddBathroomForm = ({
  onGoBack,
  onComplete,
  editingResource
}: AddBathroomFormProps) => {
  const { setToolbarModal } = useToolbarContext();
  const { mutate: addResource, isPending } = useAddResourceMutation();
  const isEditing = Boolean(editingResource);

  const methods = useForm({
    defaultValues: editingResource
      ? SCHEMA.parse(transformResourceForEdit(editingResource))
      : SCHEMA.parse({}),
    resolver: zodResolver(SCHEMA)
  });

  const onClose = () => {
    onGoBack();
    setToolbarModal(null);
  };

  const onSubmit = (resource: FormValues) => {
    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <FormProvider {...methods}>
      <ResourceForm<FormValues>
        title={
          isEditing ? 'Edit Bathroom Resource' : 'Add a Bathroom Resource'
        }
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

export default AddBathroomForm;
