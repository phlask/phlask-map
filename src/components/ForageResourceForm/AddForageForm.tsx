import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import { type ForagingFormValues } from 'schemas/foragingResourceSchema';
import ForageResourceForm from './ForageResourceForm';

type AddForageFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

type FormValues = ForagingFormValues;

const AddForageForm = ({ onGoBack, onComplete }: AddForageFormProps) => {
  const { mutate: addResource, isPending } = useAddResourceMutation();

  const onSubmit = (resource: FormValues) => {
    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <ForageResourceForm
      onSubmit={onSubmit}
      onGoBack={onGoBack}
      isSubmitting={isPending}
    />
  );
};

export default AddForageForm;
