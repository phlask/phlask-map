import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import { type BathroomFormValues } from 'schemas/bathroomResourceSchema';
import BathroomResourceForm from './BathroomResourceForm';

type AddBathroomFormProps = {
  onGoBack: VoidFunction;
  onComplete: VoidFunction;
};

const AddBathroomForm = ({ onGoBack, onComplete }: AddBathroomFormProps) => {
  const { mutate: addResource, isPending } = useAddResourceMutation();

  const onSubmit = (resource: BathroomFormValues) => {
    addResource(resource, { onSuccess: onComplete });
  };

  return (
    <BathroomResourceForm
      isSubmitting={isPending}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
};

export default AddBathroomForm;
